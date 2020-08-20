const se_scraper = require('./node_scraper.js');
var Scraper = require('./modules/se_scraper');

async function scrape(browser_config, scrape_config) {
    // scrape config overwrites the browser_config
    Object.assign(browser_config, scrape_config);

    var scraper = new se_scraper.ScrapeManager(browser_config);

    await scraper.start();

    var results = await scraper.scrape(scrape_config);

    await scraper.quit();

    return results;
}

async function html(browser_config, url) {
    const scraper = new se_scraper.ScrapeManager(browser_config);

    await scraper.start();

    const html = await scraper.html(url);

    await scraper.quit();

    return html;
}

module.exports = {
    scrape: scrape,
    html: html,
    ScrapeManager: se_scraper.ScrapeManager,
    Scraper: Scraper,
};
