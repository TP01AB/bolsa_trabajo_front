describe('Probando distinto tipos de login', () => {

    it('Un usuario se logea como alumno', () => {
        cy.visit('https://bolsatrabajovdg.netlify.app');
        cy.wait(10000);
        //cy.visit('http://localhost:4200/');
        cy.get('#login').click();

        cy.url().should('include', '/login')
        cy.get('#email').type('dario@gmail.com');
        cy.get('#password').type('123');
        cy.contains('Enviar').click();

        cy.url().should('include', '/alumno/', '{ timeout: 10000 }')
        cy.get('#logout').click();
        cy.url().should('include', 'https://bolsatrabajovdg.netlify.app');
        //cy.url().should('include', 'http://localhost:4200/');

    });

    it('Un usuario se logea empresa', () => {
        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/');

        cy.get('#login').click();
        cy.url().should('include', '/login')

        cy.get('#login').click();
        cy.url().should('include', '/login')
        cy.get('#email').type('indra@gmail.com');
        cy.get('#password').type('123');
        cy.contains('Enviar').click();
        cy.url().should('include', '/empresa/', '{ timeout: 10000 }')
        cy.get('#logout').click();
        cy.url().should('include', 'https://bolsatrabajovdg.netlify.app');
        //cy.url().should('include', 'http://localhost:4200/');
    });

    it('Un usuario intenta logearse y pone su datos mal', () => {
        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/');

        cy.get('#login').click();
        cy.url().should('include', '/login')

        cy.get('#login').click();
        cy.url().should('include', '/login')
        cy.get('#email').type('somerandomemail@random.com');
        cy.get('#password').type('somerandompassword');
        cy.contains('Enviar').click();
        cy.get('#message').should('have.text', 'Login incorrecto. Revise las credenciales.', '{ timeout: 20000 }')
    })

})

