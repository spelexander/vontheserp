import {addProcessedContent, addRawData, initReport, setLoading, readRawContent} from './database';
import {fetchHtml, fetchResults} from './fetcher';
import {countType, toHumanText} from "./analysis/html-components";
import JSSoup from "jssoup";

export const scrape = (keywords, numPages = 1, browserConfig) => {
    try {
        return fetchResults({keywords, numPages, browserConfig});
    } catch (e) {
        return {};
    }
};

export const report = (keyWords, numPages = 1, browserConfig) => {
    const reportId = initReport();
    handleReport(reportId, keyWords, numPages, browserConfig);
    return {id: reportId};
};

export const readElements = async (id, elements) => {
    const raw = await readRawContent(id);

    if (!raw) {
        return {
            error: 'unable to find content.'
        };
    }

    if (raw.loading) {
        return {
            loading: true
        };
    }

    const elementsData = raw.data && Object.values(raw.data).map(rawObj => {
        const soup = new JSSoup(rawObj.html);
        const components = {};

        elements.forEach(toCheck => {
            const key = toCheck.tag + (toCheck.filter ? `:${toCheck.filter.value}` : '');
            components[key] = countType(soup, toCheck);
        });

        return {
            result: rawObj.result,
            elements: components,
        };
    });

    return {
        elements: elementsData,
        loading: false,
    }
};

const processKeyWords = async (reportId, scrapedData) => {
    const promises = [];

    scrapedData.forEach(result => promises.push(processResultContent(result)));
    const processedResultInformation = await Promise.all(promises);

    await addRawData(reportId, processedResultInformation);
};


const transformTheScrapeResponse = (keyWords, response) => {
    if (!response || !keyWords || keyWords.length === 0) {
        return [];
    }

    const results = response && response.results;
    const data = [];

    for (const keyWord of keyWords) {
        const resultsForKeyword = results[keyWord] && results[keyWord]['1'];
        resultsForKeyword && resultsForKeyword.results.forEach(result => data.push({
            ...result,
            query: keyWord,
        }));
    }

    return data;
};

const handleReport = async (reportId, keyWords, numPages, browserConfig) => {
    const scrapedData = await scrape(keyWords, numPages, browserConfig);
    const processedScrapeData = transformTheScrapeResponse(keyWords, scrapedData);

    await addProcessedContent(reportId, processedScrapeData);
    await processKeyWords(reportId, processedScrapeData);
};

const processResultContent = async (result) => {
    try {
        const html = await fetchHtml(result.link);
        const content = toHumanText(html);
        // const structure = countDom(html, content);
        console.log('html length:', content.length);

        return {
            result,
            error: null,
            html,
            text: content,
        };
    } catch (e) {
        console.error(e);
        return {
            result,
            error: e,
            html: null,
            text: null,
        };
    }
};

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

