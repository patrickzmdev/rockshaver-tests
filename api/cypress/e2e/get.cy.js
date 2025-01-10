import { matricula, senha, agendamentos } from "../fixtures/agendamentos.json";

describe("GET /api/agendamentos", () => {
  before(() => {
    cy.deleteMany({ matricula }, { collection: "agendamentos" });

    cy.postAgendamentos(matricula, agendamentos);

    cy.login(matricula, senha);
  });

  it("deve listar os agendamentos do funcionario", () => {
    cy.api({
      method: "GET",
      url: "/api/agendamentos",
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(agendamentos.length);

      response.body.forEach((agendamento, index) => {
        expect(agendamento).to.deep.include({
          nomeCliente: agendamentos[index].nomeCliente,
          emailCliente: agendamentos[index].emailCliente,
          data: agendamentos[index].data,
          hora: agendamentos[index].hora,
        });

        expect(agendamento.servico).to.deep.include({
          nome: agendamentos[index].servicoNome,
          preco: agendamentos[index].preco,
        });
      });
    });
  });
});
