// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Pedro', {delay: 0})
    cy.get('#lastName').type('Antônio', {delay: 0})
    cy.get('#email').type('antonio@gmail.com', {delay: 0})
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('success', function(){
    cy.get('.success').should('be.visible')
})

Cypress.Commands.add('fail', function(){
    cy.get('.success').should('not.be.visible')
})