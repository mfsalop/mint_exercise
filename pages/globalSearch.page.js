const { By, until, Key } = require('selenium-webdriver');

class GlobalSearchPage {
    constructor(driver) {
        this.driver = driver;

        // Locators
        this.globalSearchButton = By.css('button[class="top-bar__button aux-search-button"]');
        this.globalSearchInput = By.css('input[name="search-input"]');
        this.globalSearchTitle = By.css('li[class="mint-breadcrumb__item mint-breadcrumb__item--active ng-star-inserted"]');
        this.globalSearchFilter = By.css('div[class="search-bar__filter ng-star-inserted"]');
        this.filterByProjectOption = By.xpath('(//mint-checkbox)[2]');
        this.cellValueSpan = By.css('a[class="ng-star-inserted"]');
        this.resultContainer = By.css('div[class="ag-center-cols-container"]');
    }

    // Start global search
    async openGlobalSearch() {
        await this.driver.wait(until.elementLocated(this.globalSearchButton), 5000);
        const button = await this.driver.findElement(this.globalSearchButton);
        await button.click();
        console.log('Global search button clicked.');

    }

    // Click on the filter button & select "Filter by Project"
    async clickFilterButton() {
        await this.driver.wait(until.elementLocated(this.globalSearchFilter), 1000);
        const filterButton = await this.driver.findElement(this.globalSearchFilter);
        await filterButton.click();
        console.log('Filter button clicked.');
        //await this.driver.sleep(2000); // Wait to ensure the filter dropdown is visible
        await this.driver.wait(until.elementLocated(this.filterByProjectOption), 1000);
        const filterOption = await this.driver.findElement(this.filterByProjectOption);
        await filterOption.click();
        console.log('Filter by project selected.');
    }

    // Enter search term and press Enter
    async enterSearchTerm(searchTerm) {
        await this.driver.wait(until.elementLocated(this.globalSearchInput), 1000);
        const input = await this.driver.findElement(this.globalSearchInput);
        await this.driver.wait(until.elementIsEnabled(input), 1000);
        await input.clear();
        await input.sendKeys(searchTerm);
        console.log(`Entered search term: ${searchTerm}`);
        await input.sendKeys(Key.ENTER);
        console.log('Search term submitted.');
    }

    async verifyResult() {
        await this.driver.sleep(10000);
    // Wait for the search results to load
        const container = await this.driver.wait(
            until.elementLocated(this.resultContainer),
            5000
        );
        console.log('Table body container found.');
    // Wait for the cell value spans to be present
        const valueSpans = await container.findElements(this.cellValueSpan);
    // Check if any cell value spans are found
        if (valueSpans.length === 0) {
            console.log('No values found.');
            return false;
        }
    // Log the text of each cell value span
        const values = [];
        for (const span of valueSpans) {
            const text = await span.getText();
            values.push(text);
        }
        console.log(JSON.stringify(values, null, 2));
    
        // ✅ Verify if any value matches "Visionary Expo" (case-insensitive)
        const isCellValueCorrect = values.some(
            (text) => text.trim().toLowerCase() === "visionary expo".toLowerCase()
        );
    
        if (!isCellValueCorrect) {
            console.error('❌ Test Failed: No cell value matches "Visionary Expo".');
        } else {
            console.log('✅ Test Passed: At least one cell value matches "Visionary Expo".');
        }
    
        return isCellValueCorrect;
    }
}

module.exports = GlobalSearchPage;
