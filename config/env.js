require('dotenv').config();  // This loads the .env file

console.log('Loaded BASE_URL from .env:', process.env.BASE_URL); // Debugging line to confirm the value of BASE_URL

module.exports = {
  baseUrl: process.env.BASE_URL  // Example: loading base URL from .env
};