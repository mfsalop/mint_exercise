# Automation Framework Explanation
Git repository: https://github.com/mfsalop/search_mint_exercise.git 

# Create a project folder
Create a folder for your project in the desired location on your computer.

# Initialize the project
#In the Visual Studio Code terminal, run. This will generate a package.json file:
npm init

# Install Selenium WebDriver, this will create a package-lock.json file and a node_modules folder: 
In the terminal, run:
npm install selenium-webdriver

# Create your Project structure
Create the following folder and file structure:
search_mint_exercise/
config/
credentials.js
env.js
pageObjects/
login.page.js
  		globalSearch.page.js
test/
   		login.test.js
   		globalSearch.test.js
	.env
package.json

# Create a .env file
In the root directory of your project, create a .env file and add the following environment variables:
.env files

BASE_URL=
TEST_USERNAME=
TEST_PASSWORD=
Replace the values with your actual test environment credentials.

# Install dotenv
Run the following command in the terminal to install the dotenv package:
npm install dotenv

# Configure environment files
Update your config files to access the environment variables:
credentials.js

require('dotenv').config();

module.exports = {
username: process.env.TEST_USERNAME,
password: process.env.TEST_PASSWORD
};

env.js

require('dotenv').config();

module.exports = {
baseUrl: process.env.BASE_URL
};

# Creating Page Object Model (POM) Files
Create Page Object Model (POM) files for each relevant page in your application. These files should contain:
Locators for all the necessary elements.
Methods for all interactions (e.g., click, input, wait).
This helps keep your test code clean and reusable by abstracting UI interactions.
l
ogin.page.js
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

You will then import and use these page objects in your test files to maintain modular and maintainable test scripts.

# Create your tests cases
const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pageObjects/login.page');
const credentials = require('../config/credentials');
const env = require('../config/env');

(async function loginTest() {
  // Initialize the browser (Chrome in this case)
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navigate to the login page
    await driver.get(env.baseUrl);

    // Initialize the LoginPage with the driver
    const loginPage = new LoginPage(driver);
      } finally {
    await driver.quit(); // Close the browser
  }
})();

This framework leverages Selenium WebDriver and JavaScript to automate tests.