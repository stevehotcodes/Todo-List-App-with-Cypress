// cypress.d.ts
declare namespace Cypress {
    interface TodoData {
      [key: string]: string;
    }
  
    interface Chainable {
      addAllTodoTasks(): Chainable<void>;
    }
  }
  