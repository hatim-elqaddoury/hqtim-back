const puppeteer = require('puppeteer');

class Test {

    constructor() {
        this.run();
        //this.runPptr();
    }

    async run() {

        try {
            

             
        } catch (e) {
            console.error(e);
        }
    }


    async runPptr() {

        try {
            const browser = await puppeteer.launch({
                headless: true,
                // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
                // userDataDir: '/Users/hatim/Library/Application Support/Google/Chrome',
                defaultViewport: null,
                // slowMo: 25
            });

            const page = await browser.newPage();

            const query = " " +
                //"(site:indeed.com | related:indeed.com) " +
                "(intext:developpeur | intext:ingénieur) " +
                "(intext:web | intext:front) " +
                //"(intext:2020 | intext:2021) " +
                "(inurl:cv | inurl:resume) " +
                //"(loc:'bourgogne' | loc:'burgundy' | loc:'dijon' | loc:'lyon' | loc:'paris') " +
                "(filetype:pdf | filetype:pdf | filetype:pdf)" +
                "";

            console.log('\n' + query + '\n');

            const maxRes = 100;

            await page.goto('https://www.google.com/search?q=' + query + "&num=" + maxRes, {
                waitUntil: 'networkidle2'
            })

            let links = await page.evaluate(() => {
                return Array.from(document.querySelectorAll("div.yuRUbf > a")).map(
                    (e) => e.href
                );
            });

            console.log(links.length + " results\n");
            console.log(links);


            // await page.goto('https://google.com/', {
            //     waitUntil: 'networkidle2'
            // })
            //await page.click('#zV9nZe'); //accept coockies
            // //await page.click('VfPpkd-RLmnJb');
            // await page.click('[name=q]');
            // await page.keyboard.type("what is " + query);
            // await page.keyboard.press('Enter');
            // // wait for search results
            // await page.waitForSelector('h3.LC20lb', {
            //     timeout: 10000
            // });


            // await page.screenshot({
            //     path: 'PPTRFULL.png',
            //     fullPage: true
            // });


            // await page.screenshot({
            //     path: 'PPTR.png',
            //     fullPage: false
            // });
            //
            // await page.pdf({
            //     path: 'PPTR.pdf',
            //     format: 'a4'
            // });



            //await page.close();
            console.log("Done");

            await browser.close();

        } catch (error) {
            console.log(error);
        }
    }
}

new Test()