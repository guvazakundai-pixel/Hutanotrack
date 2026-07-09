// Cypress support file — runs before every spec file
// https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file

beforeEach(() => {
  // Clear localStorage to ensure a clean auth state before each test
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});
