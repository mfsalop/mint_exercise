const { until, By } = require('selenium-webdriver');

class GlobalSearchPage {
    constructor(driver) {
        this.driver = driver;

        // Locators 
        this.globalSearchButton = By.css('button[class="top-bar__button aux-search-button"]');
        this.globalSearchInput = By.css('input[name="search-input"]'); 
        this.globalSearchClickForSearch = By.css('button[class="search-bar__action search-bar__action--right"]');
        this.globalSearchTitle = By.css('li.mint-breadcrumb__item.mint-breadcrumb__item--active');
    }

    // Start global search
    async openGlobalSearch() {
        await this.driver.wait(until.elementLocated(this.globalSearchButton), 10000);
        const button = await this.driver.findElement(this.globalSearchButton);
        await button.click();
        console.log('✅ Global search button clicked.');

        await this.driver.wait(until.elementLocated(this.globalSearchInput), 10000);
        const input = await this.driver.findElement(this.globalSearchInput);

        await this.driver.wait(until.elementIsVisible(input), 10000);
        await this.driver.wait(until.elementIsEnabled(input), 10000);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", input);

        await input.clear();
        await input.sendKeys("Visionary Expo");

        console.log('✅ Entered search term: Visionary Expo');
    }

    // ✅ Click search button and confirm result
    async clickSearchAndVerifyResult() {
        await this.driver.wait(until.elementLocated(this.globalSearchClickForSearch), 10000);
        const searchButton = await this.driver.findElement(this.globalSearchClickForSearch);
        await searchButton.click();
        console.log('✅ Search button clicked.');

        await this.driver.wait(until.elementLocated(this.globalSearchTitle), 10000);
        const title = await this.driver.findElement(this.globalSearchTitle);
        const text = await title.getText();
        console.log('🔎 Search result title:', text);

        return text.includes("Visionary Expo");
    }
}

module.exports = GlobalSearchPage;
