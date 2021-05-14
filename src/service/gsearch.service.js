const puppeteer = require('puppeteer');

module.exports = class GSearchService {

    constructor() {}

    /**
     * Async google search 
     * @param {*} query
     * @param {*} num max of results
     * @returns Array of links 
     */
    async search(q, num) {

        const browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
        });

        const page = await browser.newPage();

        await page.goto('https://www.google.com/search?q=' + q + "&num=" + num, {
            waitUntil: 'networkidle2'
        })

        let links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div.yuRUbf > a")).map(
                (e) => e.href
            );
        });

        await page.close();
        await browser.close();

        return links;
    }

}