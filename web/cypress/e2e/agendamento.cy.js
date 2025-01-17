import calendario from "../fixtures/calendario.json";
import agendamentos from "../fixtures/agendamentos.json";

describe("agendamento", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/calendario", {
      statusCode: 200,
      body: calendario,
    }).as("getCalendario");

    cy.log("MONGO_URI:", Cypress.env("mongodb").uri);
    cy.log("DATABASE:", Cypress.env("mongodb").database);
  });

  it("deve realizar um novo agendamento", () => {
    const agendamento = agendamentos.sucesso;

    cy.deleteMany(
      { emailCliente: agendamento.usuario.email },
      { collection: "agendamentos" }
    ).then((result) => {
      cy.log(result);
    });

    cy.preCadastroLS(agendamento.usuario);
    cy.iniciarAgendamento();
    cy.escolherProfissional(agendamento.profissional.nome);
    cy.selecionarServico(agendamento.servico.descricao);
    cy.escolherDiaAgendamento(agendamento.dia);
    cy.escolherHoraAgendamento(agendamento.hora);
    cy.finalizarAgendamento();
    cy.contains(
      "h3",
      "Tudo certo por aqui! Seu horário está confirmado."
    ).should("be.visible");
  });

  it("deve mostrar o slot ocupado", () => {
    const agendamento = agendamentos.duplicado;

    cy.deleteMany(
      { emailCliente: agendamento.usuario.email },
      { collection: "agendamentos" }
    ).then((result) => {
      cy.log(result);
    });

    cy.agendamentoApi(agendamento);
    cy.preCadastroLS(agendamento.usuario);
    cy.iniciarAgendamento();
    cy.escolherProfissional(agendamento.profissional.nome);
    cy.selecionarServico(agendamento.servico.descricao);
    cy.escolherDiaAgendamento(agendamento.dia);
    cy.get(`[slot="${agendamento.hora} - ocupado"]`)
      .should("be.visible")
      .find("svg")
      .should("be.visible")
      .and("have.css", "color", "rgb(255, 255, 255)");
  });

  it("deve retornar uma notificacao no sumario em caso de disponibilidade", () => {
    const agendamento = agendamentos.conflito;

    cy.deleteMany(
      { emailCliente: agendamento.usuario.email },
      { collection: "agendamentos" }
    ).then((result) => {
      cy.log(result);
    });

    cy.preCadastroLS(agendamento.usuario);
    cy.iniciarAgendamento();
    cy.escolherProfissional(agendamento.profissional.nome);
    cy.selecionarServico(agendamento.servico.descricao);
    cy.escolherDiaAgendamento(agendamento.dia);
    cy.escolherHoraAgendamento(agendamento.hora);

    cy.agendamentoApi(agendamento);

    cy.finalizarAgendamento();
    cy.get(".alert-error")
      .should("be.visible")
      .and(
        "have.text",
        "Já existe um agendamento para esta data e hora. Por favor, escolha outro horário."
      );
  });
});
