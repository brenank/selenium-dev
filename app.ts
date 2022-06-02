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
        $browser.manage().setTimeouts({implicit: 5000})         // 5 seconds
            .then(function () {
                $browser.get('https://watch.pokemon.com/en-us/').then(function () {
                    console.log("Search For Privacy Prompt")
                    $browser.findElements($driver.By.linkText("Accept")).then(function (results) {
                        if (results.length != 0) {
                            console.log("  Click Accept")
                            results[0].click();
                        } else {
                            console.log("  Not Found, Ignoring")
                        }

                        console.log("Click Series in Header")
                        $browser.findElement($driver.By.id("pokemonHeader"))
                            .findElement($driver.By.partialLinkText("Series"))
                            .click()
                            .then(function () {
                                console.log("Click Series 1")
                                $browser.findElement($driver.By.xpath("//a[@href = '#/season?id=pokemon-indigo-league']")).click()
                            });
                    })
                })
            })


        await delay(5000);
    } finally {
        await $browser.quit();
    }
})();