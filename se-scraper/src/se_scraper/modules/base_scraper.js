'use strict';

const cheerio = require('cheerio');
const Scraper = require('./se_scraper');
const common = require('./common.js');
var log = common.log;

class PlainHtmlScraper extends Scraper {

    constructor(...args) {
        super(...args);
    }

    async parse_async(html) {
        return this.page.content();
    }

    async load_start_page() {

    }

    async search_keyword(keyword) {

    }

    async next_page() {

    }

    async run({page, data}) {
        if (page) {
            this.page = page;
        }

        await this.page.goto(data.url);

        await this.page.evaluate(() => {
            // remove script and style tags
            Array.prototype.slice.call(document.getElementsByTagName('script')).forEach(
                function (item) {
                    item.remove();
                });
            Array.prototype.slice.call(document.getElementsByTagName('style')).forEach(
                function (item) {
                    item.remove();
                });

            // remove all comment nodes
            var nodeIterator = document.createNodeIterator(
                document.body,
                NodeFilter.SHOW_COMMENT,
                {
                    acceptNode: function (node) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );
            while (nodeIterator.nextNode()) {
                var commentNode = nodeIterator.referenceNode;
                commentNode.remove();
            }
        });


        const html_contents = await this.page.content();
        // https://stackoverflow.com/questions/27841112/how-to-remove-white-space-between-html-tags-using-javascript
        // TODO: not sure if this is save!
        return html_contents.replace(/>\s+</g, '><');
    }

    async wait_for_results() {

    }

    async detected() {
        const title = await this.page.title();
        let html = await this.page.content();
        return html.indexOf('detected unusual traffic') !== -1 || title.indexOf('/sorry/') !== -1;
    }
}

module.exports = {
    PlainHtmlScraper: PlainHtmlScraper,
};