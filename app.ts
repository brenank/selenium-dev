require('chromedriver');
const $driver = require('selenium-webdriver');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function main() {
    const $browser = new $driver.Builder().forBrowser('chrome').build();
    try {
        //Test Logic Here
        await $browser.manage().setTimeouts({implicit: 5000}); // 5 seconds
        await $browser.get('http://www.google.com/ncr');
        await $browser.findElement($driver.By.name('q')).sendKeys('hello world', $driver.Key.RETURN);
        await $browser.wait($driver.until.titleIs('hello world - Google Search'), 1000);


        await delay(50000);
    } finally {
        await $browser.quit();
    }
})();