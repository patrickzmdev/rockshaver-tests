import { Types } from "mongoose";

describe("DELETE /agendamentos/:id", () => {
  beforeEach(() => {
    //aqui precisamos de autenticacao como funcioncario para solicitar o cancelamento
    cy.login("1004", "pwd123");
  });

  context("quando tenho um agendamento", () => {
    const agendamento = {
      nomeCliente: "Patrick Zanela",
      emailCliente: "patrick@gmail.com",
      data: "10/01/2025",
      hora: "11:00",
      matricula: "1004",
      senha: "pwd123",
      codigoServico: 4,
    };

    let agendamentoId;

    before(() => {
      cy.deleteMany(
        { matricula: agendamento.matricula },
        { collection: "agendamentos" }
      ).then((result) => {
        cy.log(result);
      });
      //aqui quem faz o agendamento é o cliente
      cy.postAgendamento(agendamento).should((response) => {
        expect(response.status).to.eq(201);
        agendamentoId = response.body.agendamentoId;
      });
    });

    it("quando tenho um agendamento deve poder remover pelo id", () => {
      cy.deleteAgendamento(agendamentoId).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(
          "Agendamento cancelado com sucesso"
        );
      });
    });
  });

  it("deve retornar 404 quando o agendamento não existe", () => {
    cy.deleteAgendamento(new Types.ObjectId()).should((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error).to.eq("Agendamento não encontrado");
    });
  });
});
