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
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("postAgendamento", (body) => {
  return cy.api({
    method: "POST",
    url: "/api/agendamentos",
    headers: {
      Authorization: "Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72",
    },
    body: body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("postAgendamentos", (matricula, agendamentos) => {
  cy.wrap(agendamentos).each((agendamento) => {
    cy.api({
      method: "POST",
      url: "/api/agendamentos",
      headers: {
        Authorization: "Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72",
      },
      body: {
        nomeCliente: agendamento.nomeCliente,
        emailCliente: agendamento.emailCliente,
        data: agendamento.data,
        hora: agendamento.hora,
        matricula: matricula,
        codigoServico: agendamento.codigoServico,
      },
    }).should((response) => {
      expect(response.status).to.eq(201);
    });
  });
});

Cypress.Commands.add("login", (matricula, senha) => {
  cy.api({
    method: "POST",
    url: "/api/login",
    body: { matricula, senha },
  }).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env("token", response.body.token);
  });
});

Cypress.Commands.add("deleteAgendamento", (id) => {
  return cy.api({
    method: "DELETE",
    url: `http://localhost:3333/api/agendamentos/${id}`,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("postLembrete", (id) => {
  cy.api({
    method: "POST",
    url: `http://localhost:3333/api/agendamentos/${id}/lembrete`,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
    },
    failOnStatusCode: false,
  });
});
