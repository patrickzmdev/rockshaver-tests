
describe("pre-cadastro", () => {
  it("deve realizar o pre-cadastro do cliente", () => {

    const usuario = {
      nome: "Patrick Zanela",
      email: "patrick@gmail.com.br"
    }

    cy.iniciarPreCadastro(usuario);
    cy.verificarPreCadastro(usuario);

  });

  it("campos obrigatorios", () => {
    cy.iniciarPreCadastro();
    cy.verificarAlerta("Nome Completo", "O campo nome é obrigatório.");

    cy.verificarAlerta("E-mail", "O campo e-mail é obrigatório.");
  });

  it("inserindo somente o primeiro nome no cadastro", () => {
    const usuario = {
      nome: "Patrick",
      email: "patrick@gmail.com.br"
    }

    cy.iniciarPreCadastro(usuario);
    cy.verificarAlerta("Nome Completo","Informe seu nome completo");
  });

  it("inserindo email invalido no cadastro", () => {
    const usuario = {
      nome: "Patrick Zanela",
      email: "www.gmail.com.br"
    }
    cy.iniciarPreCadastro(usuario);
    cy.verificarAlerta("E-mail", "O e-mail inserido é inválido.");
  });
});
