import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:4200',
    defaultCommandTimeout: 10000,
    slowTestThreshold: 5000,
    requestTimeout: 4000,
    responseTimeout: 30000,
    pageLoadTimeout: 60000,
    taskTimeout: 60000,
  },
});
