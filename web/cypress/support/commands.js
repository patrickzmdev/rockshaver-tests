import './actions/agendamento.actions';
import './actions/pre-cadastro.actions';

Cypress.Commands.add('agendamentoApi', (agendamento) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env('baseApi')}/api/agendamentos`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 3a8a9b8fae87baf503e7c5fe5b97fd72'
    },
    body: {
      nomeCliente: agendamento.usuario.nome,
      emailCliente: agendamento.usuario.email,
      data: agendamento.data,
      hora: agendamento.hora,
      matricula: agendamento.profissional.matricula,
      codigoServico: agendamento.servico.codigo

    }
  }).then((response) => {
    expect(response.status).to.eq(201);
  });
});
