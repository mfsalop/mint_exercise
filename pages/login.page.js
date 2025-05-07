require('dotenv').config(); // Load .env variables

const { baseUrl } = require('../config/env');
const { username, password } = require('../config/credentials');
const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.baseUrl = baseUrl;

        // Locators (using By)
        this.usernameField = By.css('input#username');
        this.passwordField = By.css('input#password');
        this.signInButton = By.css('button[type="submit"]');
        this.modalLogin = By.css('div.modal-content');
        this.cancelButton = By.css('button.mint-btn.mint-btn--secondary');
        this.scheduleContainer = By.css('div.page-container.ng-star-inserted');
    }

    async open() {
        await this.driver.get(this.baseUrl);
        console.log(`Navigating to: ${this.baseUrl}`);
        await this.handleModal();
    }

    async handleModal(timeout = 30000) {
        try {
            await this.driver.wait(until.elementLocated(this.modalLogin), timeout);
            console.log('Modal is present. Closing the modal...');

            await this.driver.wait(until.elementLocated(this.cancelButton), timeout);
            const cancelButton = await this.driver.findElement(this.cancelButton);
            await cancelButton.click();
            console.log('Modal closed successfully.');
        } catch {
            console.log('No modal found or already handled.');
        }
    }

    async waitForUsernameField(timeout = 10000) {
        const element = await this.driver.wait(
            until.elementLocated(this.usernameField),
            timeout,
            'Username field not found'
        );
        await this.driver.wait(until.elementIsVisible(element), timeout);
        await this.driver.wait(until.elementIsEnabled(element), timeout);
    }

    async enterUsername(uname = username) {
        await this.waitForUsernameField();
        const usernameElement = await this.driver.findElement(this.usernameField);
        await usernameElement.clear();
        await usernameElement.sendKeys(uname);
    }

    async enterPassword(pwd = password) {
        const passwordElement = await this.driver.findElement(this.passwordField);
        await passwordElement.clear();
        await passwordElement.sendKeys(pwd);
    }

    async clickLoginButton() {
        const loginButtonElement = await this.driver.findElement(this.signInButton);
        await loginButtonElement.click();
    }

    async login(uname = username, pwd = password) {
        await this.open();
        await this.enterUsername(uname);
        await this.enterPassword(pwd);
        await this.clickLoginButton();
    }

    async isLoginSuccessful(timeout = 50000) {
        try {
            const element = await this.driver.wait(
                until.elementLocated(this.scheduleContainer),
                timeout,
                'Schedule container not found'
            );
            await this.driver.wait(until.elementIsVisible(element), timeout);
            console.log('Login confirmed: schedule container is visible.');
            return true;
        } catch (error) {
            console.error('Login confirmation failed:', error.message);
            return false;
        }
    }
}

module.exports = LoginPage;
