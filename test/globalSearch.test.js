const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/login.page');
const GlobalSearchPage = require('../pages/globalSearch.page');
const { username, password } = require('../config/credentials');

async function runTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('chrome').build();

        // Precondition: Login
        const loginPage = new LoginPage(driver);
        console.log('Portal User is logs in');
        await loginPage.login(username, password);

        const loggedIn = await loginPage.isLoginSuccessful();
        if (!loggedIn) {
            throw new Error('Login failed: schedule element not visible.');
        }
        console.log('Login successful.');

        // Global Search Test : Search for project "Visionary Expo"
        const globalSearchPage = new GlobalSearchPage(driver);
        console.log('Global search test started.');
        await globalSearchPage.openGlobalSearch();
        await globalSearchPage.clickSearchAndVerifyResult();

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
