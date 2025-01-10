Cypress.Commands.add('iniciarPreCadastro', (usuario) => {
  cy.visit('/')

  cy.get('header nav a[href="pre-cadastro"]').click();

  cy.get("form h2").should("be.visible").and("contain", "Seus dados");

  cy.get('input[name="fullname"]').as('nome');

  cy.get("#email").as('email');

  if(usuario?.nome){
    cy.get('@nome').type(usuario.nome);
  }

  if(usuario?.email){
    cy.get('@email').type(usuario.email);
  }

  cy.contains('button[type="submit"]','Continuar').click();
});

Cypress.Commands.add('verificarPreCadastro', (usuario) => {
  cy.get('.usuario-nome').should('be.visible').and('contain', 'Olá, ' + usuario.nome.split(' ')[0]);

  cy.get('.usuario-email').should('be.visible').and('contain', usuario.email);

  cy.window().then(win => {
    const chaveUsuario = win.localStorage.getItem('usuario');
    expect(chaveUsuario).to.eql(JSON.stringify(usuario));
  });

});

Cypress.Commands.add('preCadastroLS', (usuario) => {
  cy.window().then(win => {
    win.localStorage.setItem('usuario', JSON.stringify(usuario));

    cy.visit('/');
    cy.contains(usuario.email).should('be.visible');
  });

});

Cypress.Commands.add('verificarAlerta', (campo,texto) => {
  cy.contains('label', campo).parent().find('.alert-msg').should('be.visible').and('contain', texto);
});
