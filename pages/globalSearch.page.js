const { By, until, Key } = require('selenium-webdriver');

class GlobalSearchPage {
    constructor(driver) {
        this.driver = driver;

        // Locators
        this.globalSearchButton = By.css('button[class="top-bar__button aux-search-button"]');
        this.globalSearchInput = By.css('input[name="search-input"]');
        this.globalSearchTitle = By.css('li[class="mint-breadcrumb__item mint-breadcrumb__item--active ng-star-inserted"]');
        this.cellValueSpan = By.css('a[class="ng-star-inserted"]');
    }

    // Start global search
    async openGlobalSearch() {
        await this.driver.wait(until.elementLocated(this.globalSearchButton), 10000);
        const button = await this.driver.findElement(this.globalSearchButton);
        await button.click();
        console.log('Global search button clicked.');

        await this.driver.wait(until.elementLocated(this.globalSearchInput), 10000);
        const input = await this.driver.findElement(this.globalSearchInput);
        await this.driver.wait(until.elementIsEnabled(input), 10000);
        await input.clear();
        await input.sendKeys('Visionary Expo');
        await this.driver.sleep(5000); // Wait to ensure the input is ready
        await input.sendKeys(Key.ENTER);

        console.log('Entered search term: Visionary Expo and pressed Enter');
    }

    // Verify result
    async verifyResult() {
        // Wait for the title to be visible
        await this.driver.sleep(5000);
        await this.driver.wait(until.elementLocated(this.globalSearchTitle), 30000);
        const title = await this.driver.findElement(this.globalSearchTitle);
        const titleText = await title.getText();
        console.log('Search result title:', titleText);

        // Verify if the title includes "Global Search"
        const isTitleCorrect = titleText.includes("Global Search");
        if (!isTitleCorrect) {
            console.error('Title does not contain "Global Search".');
        }

        // Wait for the cell value to become visible
        await this.driver.wait(until.elementLocated(this.cellValueSpan), 10000);
        const cellValueElement = await this.driver.findElement(this.cellValueSpan);
        const cellValueText = await cellValueElement.getText();
        console.log('Cell value:', cellValueText);

        // Verify if the cell value matches "Visionary Expo"
        const isCellValueCorrect = cellValueText.trim().toLowerCase() === "visionary expo".toLowerCase();
        if (!isCellValueCorrect) {
            console.error('Cell value does not match "Visionary Expo".');
        }

        return isTitleCorrect && isCellValueCorrect;
    }
}

module.exports = GlobalSearchPage;
