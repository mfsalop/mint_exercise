const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/login.page');
const GlobalSearchPage = require('../pages/globalSearch.page');
const { username, password } = require('../config/credentials');
const searchTerm = "Visionary Expo"

async function runTest() {
    let driver;

    try {
        // Set Chrome as Cognito
        const options = new chrome.Options();
        options.addArguments('--incognito');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        const loginPage = new LoginPage(driver);

        // Precondition: Login
        console.log('Portal User is logging in');
        await loginPage.login(username, password);
        const loggedIn = await loginPage.isLoginSuccessful();
        if (!loggedIn) {
            throw new Error('Login failed: schedule element not visible.');
        }
        console.log('Login successful.');

        // Global Search Test: Search for project "Visionary Expo"
        const globalSearchPage = new GlobalSearchPage(driver);
        console.log('Global search test started.');
        await globalSearchPage.openGlobalSearch();
        await globalSearchPage.clickFilterButton();
        //await driver.sleep(5000); // Wait to see the filter dropdown results (use to review test automation)
        // Type the search term "Visionary Expo" and press Enter
        await globalSearchPage.enterSearchTerm(searchTerm);
        // Wait for the search results to load
        //await driver.sleep(5000); // Adjust this sleep time as needed (use to review test automation)
        await globalSearchPage.verifyResult(driver);
        //await globalSearchPage.verifyResult();
        console.log('Global search completed.');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

runTest();
