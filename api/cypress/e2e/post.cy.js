describe("POST /api/agendamentos", () => {
  it("deve criar um novo agendamento", () => {
    cy.deleteMany({ matricula: "1001" }, { collection: "agendamentos" });
    const body = {
      emailCliente: "fernando@yahoo.com",
      nomeCliente: "Fernando Papito",
      data: "20/12/2024",
      hora: "14:00",
      matricula: "1001",
      codigoServico: "1",
    };

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Agendamento criado com sucesso");
      expect(response.body.agendamentoId).to.match(/^[a-fA-F0-9]{24}$/);
    });
  });

  it("deve retornar erro quando o agendamento já existe", () => {
    const body = {
      emailCliente: "patrick@yahoo.com",
      nomeCliente: "Patrick Zanela",
      data: "20/12/2024",
      hora: "10:00",
      matricula: "1002",
      codigoServico: "2",
    };

    cy.deleteMany(
      { matricula: body.matricula },
      { collection: "agendamentos" }
    );

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(201);
    });

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.message).to.eq(
        "Já existe um agendamento para esta data e hora. Por favor, escolha outro horário."
      );
    });
  });

  it("deve retornar erro quando o email é invalido", () => {
    const body = {
      emailCliente: "patrickyahoo.com",
      nomeCliente: "Patrick Zanela",
      data: "20/12/2024",
      hora: "10:00",
      matricula: "1002",
      codigoServico: "2",
    };

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq(
        "O campo emailCliente deve conter um email válido."
      );
    });
  });

  it("deve retornar erro quando a matricula é invalida", () => {
    const body = {
      emailCliente: "patrick@yahoo.com",
      nomeCliente: "Patrick Zanela",
      data: "20/12/2024",
      hora: "10:00",
      matricula: "9999",
      codigoServico: "2",
    };

    cy.postAgendamento(body).should((response) => {
      expect(response.status).to.eq(404);
      expect(response.body.error).to.eq("Funcionário não encontrado.");
    });
  });

  context("Campos obrigatórios", () => {
    const camposObrigatorios = [
      {
        campo: "emailCliente",
        mensagem: "O campo emailCliente é obrigatório.",
      },
      { campo: "nomeCliente", mensagem: "O campo nomeCliente é obrigatório." },
      { campo: "data", mensagem: "O campo data é obrigatório." },
      { campo: "hora", mensagem: "O campo hora é obrigatório." },
      { campo: "matricula", mensagem: "O campo matricula é obrigatório." },
      {
        campo: "codigoServico",
        mensagem: "O campo codigoServico é obrigatório.",
      },
    ];

    camposObrigatorios.forEach((i) => {
      it(`deve retornar erro quando o ${i.campo} codigo de servico não existe`, () => {
        const body = {
          emailCliente: "patrick@yahoo.com",
          nomeCliente: "Patrick Zanela",
          data: "20/12/2024",
          hora: "10:00",
          matricula: "1001",
          codigoServico: "1",
        };

        delete body[i.campo];

        cy.postAgendamento(body).should((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.error).to.eq(i.mensagem);
        });
      });
    });
  });
});
