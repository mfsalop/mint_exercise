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

    /*
    // Verify result
    async verifyResult() {
        // Wait for the title to be visible
        await this.driver.sleep(5000);
        await this.driver.wait(until.elementLocated(this.globalSearchTitle), 1000);
        const title = await this.driver.findElement(this.globalSearchTitle);
        const titleText = await title.getText();
        console.log('Search result title:', titleText);

        // Verify if the title includes "Global Search"
        const isTitleCorrect = titleText.includes("Global Search");
        if (!isTitleCorrect) {
            console.error('Title does not contain "Global Search".');
        }

        // Wait for the cell value to become visible
        await this.driver.wait(until.elementLocated(this.cellValueSpan), 1000);
        const cellValueElement = await this.driver.findElement(this.cellValueSpan);
        const cellValueText = await cellValueElement.getText();
        console.log('Cell value:', cellValueText);

        // Verify if the cell value matches "Visionary Expo"
        const isCellValueCorrect = cellValueText.trim().toLowerCase() === "visionary Expo".toLowerCase();
        if (!isCellValueCorrect) {
            console.error('❌ Test Failed: Cell value does not match "Visionary Expo".');
        }

        return isTitleCorrect && isCellValueCorrect;
        console.log('✅ Test Passed: Cell value matches "Visionary Expo".');
    } */
   
    // Get table resources
    async getTableResults(driver) {
        // Wait until at least one row is visible
        await driver.wait(until.elementLocated(By.css('.ag-center-cols-container [role="row"]')), 5000);
    
        // Now get all visible rows
        const rows = await driver.findElements(By.css('.ag-center-cols-container [role="row"]'));
    
        const tableData = [];
    
        for (const row of rows) {
            const rowData = {};
            const cells = await row.findElements(By.css('[role="gridcell"]'));
    
            for (const cell of cells) {
                const colId = await cell.getAttribute('col-id') || 'unknown';
    
                let text = '';
                try {
                    const link = await cell.findElement(By.css('a'));
                    text = await link.getText();
                } catch (e) {
                    text = await cell.getText();
                }
    
                rowData[colId] = text.trim();
            }
    
            tableData.push(rowData);
        }
    
        return tableData;
    }
}

module.exports = GlobalSearchPage;
