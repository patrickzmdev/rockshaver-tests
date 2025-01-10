describe("login", () => {
  beforeEach(() => {
    cy.viewport("iphone-xr");
    cy.visit("/");
    cy.contains("p", "Faça login com a sua conta").should("be.visible");
  });
  it("deve logar como barbeiro", () => {
    const funcionario = {
      matricula: "1007",
      senha: "pwd123",
      nome: "Slash",
    };

    cy.login(funcionario);
    cy.verificarUsuarioLogado(funcionario);
  });

  it("não deve logar quando a senha é inválida", () => {
    const funcionario = {
      matricula: "1008",
      senha: "abc123",
      nome: "Kurt",
    };

    cy.login(funcionario);
    cy.wait(1000);

    cy.document().then((doc) => {
      const codigoHtml = doc.documentElement.outerHTML;
      cy.writeFile("temp.html", codigoHtml);
    });

    cy.verificarToast("Falha ao realizar login. Verifique suas credenciais.");
  });

  it("não deve logar quando a matricula é inválida", () => {
    const funcionario = {
      matricula: "1010",
      senha: "abc123",
      nome: "Kurt",
    };

    cy.login(funcionario);
    cy.wait(1000);

    cy.document().then((doc) => {
      const codigoHtml = doc.documentElement.outerHTML;
      cy.writeFile("temp.html", codigoHtml);
    });

    cy.verificarToast("Falha ao realizar login. Verifique suas credenciais.");
  });

  it("não deve logar quando os campos não são preenchidos", () => {
    cy.get("form").submit();

    cy.verificarToast("Informe sua matrícula e sua senha!");
  });
});
