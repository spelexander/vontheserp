import se_scraper from '../se-scraper';
import defaultScrapeConfig from './default-scrape-config'
import {addProcessedContent, addRawData, initReport, setLoading, readRawContent} from './data';
import {fetchHtml} from './fetcher';
import {countDom, countType, toHumanText} from "./analysis/html-components";
import JSSoup from "jssoup";

export const scrape = (keyWords, numPages = 1, browserConfig) => {
    let scrape_job = {
        search_engine: 'google',
        keywords: keyWords,
        num_pages: numPages,
        block_assets: true,
        test_evasion: true,
        apply_evasion_techniques: true,
    };

    return se_scraper.scrape({...defaultScrapeConfig, ...browserConfig}, scrape_job);
};

export const report = (keyWords, numPages = 1, browserConfig) => {
    const reportId = initReport();
    handleReport(reportId, keyWords, numPages, browserConfig);
    return {id: reportId};
};


export const readElements = (id, elements) => {
    const raw = readRawContent(id);

    if (!raw) {
        return {
            error: 'unable to find content.'
        }
    }

    if (raw.loading) {
        return {loading: true}
    }

    return raw.data && raw.data.map(rawObj => {
        const soup = new JSSoup(rawObj.html);
        const components = {};

        elements.forEach(toCheck => {
            components[toCheck] = countType(soup, toCheck, true)
        });

        return {
            result: rawObj.result,
            elements: components,
        }
    });
};

const processKeyWord = async (reportId, scrapedData, keyWord) => {
    const dataForKeyWord = scrapedData.results[keyWord];
    const promises = [];

    dataForKeyWord['1'].results.forEach(result => promises.push(processResultContent(result)));
    const processedResultInformation = await Promise.all(promises);
    await saveReport(keyWord, reportId, processedResultInformation);
};

const handleReport = async (reportId, keyWords, numPages, browserConfig) => {
    const scrapedData = await scrape(keyWords, numPages, browserConfig);
    for (const keyWord of keyWords) {
        await processKeyWord(reportId, scrapedData, keyWord);
    }
    setLoading(reportId, false);
};

const saveReport = async (keyWord, reportId, processedResultInformation) => {
    const promises = [];

    promises.push(addProcessedContent(reportId, processedResultInformation.map(processed => ({
        ...processed.info,
        query: keyWord,
    }))));
    promises.push(addRawData(reportId, processedResultInformation.map(processed => ({
        ...processed.raw,
        query: keyWord,
    }))));

    await Promise.all(promises);
};

const processResultContent = async (result) => {
    const html = await fetchHtml(result.link);
    const content = toHumanText(html);
    const structure = countDom(html, content);


    return {
        info: {
            result,
            structure,
            analysis: {},
        },
        raw: {
            result,
            html,
            text: content,
        },
    };
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

