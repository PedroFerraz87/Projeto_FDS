describe('História 7: Checklist - Criação e Marcação', () => {

  beforeEach(() => {
    cy.deleteAllUsers();
    cy.createUser('roboteste', 'teste@example.com', 'senha12345');
    cy.login('teste@example.com', 'senha12345');
  });

  it('Cenário favorável 1: Criação de itens', () => {
    cy.visit('/checklist');
    cy.get('input[name="item"]').type('Passaporte');
    cy.get('button').contains('Adicionar Item').click();

    cy.get('input[name="item"]').type('Mala');
    cy.get('button').contains('Adicionar Item').click();

    cy.contains('Passaporte').should('be.visible');
    cy.contains('Mala').should('be.visible');

  });

  it('Cenário favorável 2: O sistema dá o check e desce o item pro final cortado, como já concluído', () => {
    cy.visit('/checklist');
    cy.get('input[name="item"]').type('Seguro Viagem');
    cy.get('button').contains('Adicionar Item').click();

    cy.contains('Seguro Viagem').parent().parent().within(() => {
      cy.get('form').first().submit();
    });

    cy.get('span').contains('Seguro Viagem')
    cy.contains('Passaporte').parent().parent().within(() => {
      cy.get('form').first().submit();
    });

    cy.get('span').contains('Passaporte')
  });

  it('Cenário desfavorável 2: Tenta adicionar item vazio', () => {
    cy.visit('/checklist');
    cy.get('button').contains('Adicionar Item').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Preencha o campo antes de adicionar!');
    });
  });

});
