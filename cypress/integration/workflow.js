/* eslint-disable no-undef */
/// <reference types="Cypress" />

it('should work when the password is correct', () => {
  cy.visit('');
  cy.get('#legalAge').click();
  cy.get('#password-manager-info-next-button').click();
  cy.get('#firstPassword').type('Barbarian14!');
  cy.get('#secondPassword').type('Barbarian14!');
  cy.get('#hint').type('Barbarian14!');
  cy.get('#password-manager-creation-next-button').click();
  cy.get('#check').click();
});

it('should not work when the password is not correct', () => {
  cy.visit('');
  cy.get('#legalAge').click();
  cy.get('#password-manager-info-next-button').click();
  cy.get('#firstPassword').type('pruebaKO123');
  cy.get('#secondPassword').type('pruebaKO123');
  cy.get('#hint').type('pruebaKO123');
  cy.get('#password-manager-creation-next-button').click();
  cy.get('#warning').click();
});
