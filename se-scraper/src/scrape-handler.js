import se_scraper from './se_scraper';
import defaultScrapeConfig from './se_scraper/default-scrape-config'

export const scrape = (keyWords, numPages = 1, browserConfig = {}) => {
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

export const html = (url, browserConfig = {}) => {
    return se_scraper.html({...defaultScrapeConfig, ...browserConfig}, url);
};
