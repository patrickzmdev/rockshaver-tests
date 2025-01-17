const { configurePlugin } = require("cypress-mongodb");
require("dotenv").config();

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
      // implement node event listeners here
      console.log("MONGO_URI:", process.env.MONGO_URI);
      console.log("DATABASE:", process.env.DATABASE);
      console.log("WEB_URL:", process.env.WEB_URL);
      console.log("API_URL:", process.env.API_URL);
    },
    baseUrl: process.env.WEB_URL,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  env: {
    mongodb: {
      uri: process.env.MONGO_URI,
      database: process.env.DATABASE,
    },
    baseApi: process.env.API_URL,
  },
};
