# 🚀 Automation Framework – Mint Exercise

🔗 GitHub Repository: mint_exercise

This project demonstrates a lightweight and modular Selenium WebDriver automation framework using JavaScript. The design follows the Page Object Model (POM) and leverages environment configuration for clean, scalable testing.

## 📁 Project Setup

1. Create a Project Folder
Open your terminal and create a new directory:

2. Initialize the Project
Start your Node.js project by running:
npm init -y
This creates a package.json file.

3. Install Selenium WebDriver
Add Selenium WebDriver as a dependency:
npm install selenium-webdriver
This will also generate a package-lock.json and a node_modules/ folder.

## 🔐 Environment Configuration

4. Create a .env File
In the root of your project, add:

BASE_URL=
TEST_USERNAME=
TEST_PASSWORD=
Replace the values with your actual credentials.

5. Install dotenv
To enable loading of environment variables:

npm install dotenv

## ⚙️ Configure Environment Files

config/credentials.js
require('dotenv').config();

module.exports = {
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD
};
config/env.js
require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL
};

## 🧱 Page Object Model (POM)

Page objects abstract UI logic, improving reusability and maintainability.

pageObjects/login.page.js
const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.id('username');
    this.passwordField = By.id('password');
    this.loginButton = By.id('loginBtn');
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameField).sendKeys(username);
    await this.driver.findElement(this.passwordField).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }
}

module.exports = LoginPage;

## ✅ Writing Test Cases

test/login.test.js
const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pageObjects/login.page');
const credentials = require('../config/credentials');
const env = require('../config/env');

(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(env.baseUrl);
    const loginPage = new LoginPage(driver);
    await loginPage.login(credentials.username, credentials.password);
    // Add assertions here if needed
  } finally {
    await driver.quit();
  }
})();


### 💡 Key Features
### 🧩 Modular architecture (POM)
### 🔐 Secure config management via .env
### 💻 Lightweight JS + Selenium WebDriver stack
### ♻️ Scalable structure for future test growth