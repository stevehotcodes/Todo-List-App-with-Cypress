describe('Todo Page Test',()=>{

    beforeEach(()=>{
        cy.visit('/');
    });

   it('should render the page correctly',()=>{
    cy.get('[data-cy="todo-input-container"]').should('contains.class','todo-input-container');
    cy.get('[data-cy="todo-input"]').should('have.attr', 'placeholder','Try typing something here');
        cy.get('[data-cy="completed-tasks-title"]').should('contains.text','Completed Tasks');
    cy.get('[data-cy="completed-tasks-list"]').should('not.be.visible')
   
   })

   it('should add a tasks successfully',()=>{
       cy.addAllTodoTasks()
   })

   it('should mark a task complete',()=>{
    cy.addAllTodoTasks();
      
       
   })





})