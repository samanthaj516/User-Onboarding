describe("Form Application", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    })

    const name = () => cy.get('[data-cy=name]');
    const email = () => cy.get('[data-cy=email]');
    const password = () => cy.get('[data-cy=password]');
    const agree = () => cy.get('[data-cy=agree]');
    const submitBtn = () => cy.get('[data-cy=submitBtn]');

    it("Can fill out inputs", () => {
        name()
            .should('have.value', '')
            .type('Samantha Johnson')
            .should('have.value', 'Samantha Johnson');

        email()
            .should('have.value', '')
            .type('samantha.johnson55@gmail.com')
            .should('have.value', 'samantha.johnson55@gmail.com');

        password()
            .should('have.value', '')
            .type('12345678')
            .should('have.value', '12345678');
    }); 

    it("Can check the terms of service box", () => {
        termsOfService()
            .check()
            .should('be.checked');
    });

    it("Can submit the form", () => {
        cy.contains(/Samantha Johnson/i).should('not.exist');
        name().type('Samantha Johnson');
        email().type('samantha.johnson55@gmail.com');
        password().type('12345678');
        agree().check();
        submitBtn().click();
        cy.contains(/Samantha Johnson/i).should('exist');
    });

    it("Submit button is disabled if name is left empty", () => {
        name().should('have.value', '');
        email().type('samantha.johnson55@gmail.com');
        password().type('12345678');
        agree().check();
        submitBtn().should('be.disabled');
    });

    it("Submit button is disabled if email is left empty", () => {
        name().type('Samantha Johnson');
        email().should('have.value', '');
        password().type('12345678');
        agree().check();
        submitBtn().should('be.disabled');
    });

    it("Submit button is disabled if password is left empty", () => {
        name().type('Samantha Johnson');
        email().type('samantha.johnson55@gmail.com');
        password().should('have.value', '');
        agree().check();
        submitBtn().should('be.disabled');
    });

    it("Submit button is disabled if terms of service is not checked", () => {
        name().type('Samantha Johnson');
        email().type('samantha.johnson55@gmail.com');
        password().type('12345678');
        agree().should('not.be.checked');
        submitBtn().should('be.disabled');
    });
});