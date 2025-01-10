class PreRegPage {

  fillForm(fullname, email) {
    cy.get("form h2").should("be.visible").and("contain", "Seus dados");

    cy.get('input[name="fullname"]').type(fullname);

    cy.get("#email").type(email);
  }

  submit() {
    cy.contains('button[type="submit"]','Continuar').click();
  }

  alertHave(fieldname, text) {

    cy.contains('label', fieldname).parent().find('.alert-msg').should('be.visible').and('contain', text);
  }
}

export default new PreRegPage();
