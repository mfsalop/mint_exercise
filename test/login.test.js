const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/login.page');
const { username, password } = require('../config/credentials');

async function runTests() {
    let driver;
    let loginPage;

    try {
        // Set up the Selenium WebDriver with Chrome options to disable JavaScript
        const options = new chrome.Options();
        options.setUserPreferences({
            'profile.managed_default_content_settings.javascript': 2
        });

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();

        loginPage = new LoginPage(driver);

        // Test: Login with valid credentials
        await loginPage.login(username, password);
        console.log('Login action completed.');
        // Check if login was successful
        const success = await loginPage.isLoginSuccessful();
        if (!success) {
            throw new Error('Login failed: schedule element not visible.');
        }
        console.log('✅ Login test passed: schedule element is visible.');
        
    } catch (error) {
        console.error('Test failed:', error.message);
    } finally {
        // Always close the browser after tests are done
        if (driver) {
            await driver.quit();
        }
    }
}

// Run the test
runTests();