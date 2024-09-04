describe('Todo Page Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the page correctly', () => {
    cy.get('[data-cy="todo-input-container"]').should(
      'contains.class',
      'todo-input-container',
    );
    cy.get('[data-cy="todo-input"]').should(
      'have.attr',
      'placeholder',
      'Try typing something here',
    );
    cy.get('[data-cy="completed-tasks-title"]').should(
      'contains.text',
      'Completed Tasks',
    );
    cy.get('[data-cy="completed-tasks-list"]').should('not.be.visible');
  });

  it('should add a tasks successfully', () => {
    cy.addAllTodoTasks();
  });

  it('should mark a task complete', () => {
    cy.addAllTodoTasks();
    cy.get(':nth-child(5) > input').click()
  });

  it ('should delete a task ', ()=>{
    cy.addAllTodoTasks();
    cy.get(':nth-child(2) > .delete-edit-container > .delete-btn').should('be.visible').click()
  })
  it('should update a task ', ()=>{
    cy.addAllTodoTasks();
    cy.get(':nth-child(2) > .delete-edit-container > .edit-btn').should('be.visible').click()
    cy.fixture('todoData').then((data)=>{
      cy.get('[data-cy="todo-input"]').should('be.visible').type(data.editedContent)
      cy.get('[data-cy="add-update-btn"]').should('be.visible').and('contains.text', 'Update').click()
      
    })
   
  })
});
