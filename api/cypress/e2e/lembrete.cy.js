import { Types } from "mongoose";

describe("POST /agendamentos/:id/lembrete", () => {
  beforeEach(() => {
    //aqui precisamos de autenticacao como funcioncario para solicitar o cancelamento
    cy.login("1005", "pwd123");
  });

  context("quando tenho um agendamento", () => {
    const agendamento = {
      nomeCliente: "Patrick Medeiros",
      emailCliente: "patrickmed@gmail.com",
      data: "10/01/2025",
      hora: "11:00",
      matricula: "1005",
      senha: "pwd123",
      codigoServico: 2,
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

    it("deve poder enviar um lembrete por email", () => {
      cy.log("todo");

      cy.postLembrete(agendamentoId).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Lembrete enviado com sucesso");
      });

      cy.findOne(
        { agendamentoId: new Types.ObjectId(agendamentoId) },
        { collection: "lembretes" }
      ).then((result) => {
        expect(result.conteudoHtml).to.include(agendamento.nomeCliente);
      });
    });
  });

  it("deve retornar 404 quando o agendamento não existe", () => {
    cy.postLembrete(new Types.ObjectId()).should((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
