Cypress.Commands.add("login", (funcionario) => {
  cy.get('input[placeholder="Informe sua matrícula"]').type(
    funcionario.matricula
  );
  cy.get('input[placeholder="Sua senha secreta"]').type(funcionario.senha);
  cy.contains("button", "Entrar").click();
});

Cypress.Commands.add("verificarUsuarioLogado", (funcionario) => {
  cy.get(".usuario-logado").within(() => {
    cy.get("small")
      .should("be.visible")
      .and("have.text", `Olá ${funcionario.nome},`);

    cy.get("h2")
      .should("be.visible")
      .and("have.text", "esse é o seu painel de atendimento!");
  });
});
