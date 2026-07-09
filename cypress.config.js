const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 10000,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.spec.js',
    video: false,
    screenshotOnRunFailure: true,
  },
});
