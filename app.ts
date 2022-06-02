require('chromedriver');
const webdriver = import('selenium-webdriver');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function main() {
    const $driver = await webdriver
    const $browser = new $driver.Builder().forBrowser('chrome').build();
    try {
        //Test Logic Here
        await $browser.manage().setTimeouts({implicit: 5000}); // 5 seconds

        await $browser.get('https://watch.pokemon.com/en-us/');

        console.log("Search For Privacy Prompt")
        let results = await $browser.findElements($driver.By.linkText("Accept"));
        if (results.length != 0) {
            console.log("  Click Accept")
            await results[0].click();
        } else {
            console.log("  Not Found, Ignoring")
        }

        console.log("Click Series in Header")
        await $browser.findElement($driver.By.id("pokemonHeader"))
            .findElement($driver.By.partialLinkText("Series"))
            .click();

        console.log("Click Series 1")
        await $browser.findElement($driver.By.xpath("//a[@href = '#/season?id=pokemon-indigo-league']")).click()


        await delay(5000);
    } finally {
        await $browser.quit();
    }
})();