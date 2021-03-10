describe('Probando registro de un alumno', () => {

    it('Probando registro con campos incorrectos', () => {

        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/');
        cy.get('#registro').click();
        cy.url().should('include', '/registro')
        cy.wait(5000);
        cy.get('#email').type('pepecom');
        cy.get('#password').type('1');
        cy.get('#opcion').select('Alumno');

        cy.get('#nombre').type('pepe');
        cy.get('#apellidos').type('pelaez');
        cy.get('#dni').type('123456789');
        cy.get('#fechaNac').type('1990-4-55');
        cy.get('#telef').type('6068401001');
        cy.get('#aptitudes').type('a');

        cy.get('#btnRegist').click();
        cy.get('.invalid-feedback').should('be.visible');

    })

    it('Probando registro con campos correctos', () => {
        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/');
        cy.get('#registro').click();
        cy.url().should('include', '/registro')
        cy.get('#email').type('pepe@gmail.com');
        cy.get('#password').type('123');
        cy.get('#opcion').select('Alumno');

        cy.get('#nombre').type('Pepe');
        cy.get('#apellidos').type('Pelaez');
        cy.get('#dni').type('12345678A');
        cy.get('#fechaNac').type('1990-4-5');
        cy.get('#telef').type('606840100');
        cy.get('#status').select('Parado');
        cy.get('#aptitudes').type('Esto es un texto descriptivo');

        cy.get('#btnAreas').click();
        cy.get('#modal-basic-title').should('have.text', 'Ciclos', '{ timeout: 10000 }')
        cy.get('#1').check();
        cy.get('#3').check();
        cy.get('#btnModalAr').click();

        cy.get('#btnRegist').click();
        cy.wait(5000);
        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/', '{ timeout: 20000 }');
        cy.get('#login').click();

        cy.url().should('include', '/login')
        cy.get('#email').type('pepe@gmail.com');
        cy.get('#password').type('123');
        cy.contains('Enviar').click();

        cy.get('#message').should('have.text', 'Usuario desactivado,contacte con el administrador', '{ timeout: 20000 }')
    })

    it('Probando registro con campos correctos', () => {
        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/');
        cy.get('#registro').click();
        cy.url().should('include', '/registro')
        cy.get('#email').type('empresa@gmail.com');
        cy.get('#password').type('123');
        cy.get('#opcion').select('Empresa');

        cy.get('#cif').type('S0982177H');
        cy.get('#fecha').type('1990-4-5');
        cy.get('#nombre').type('Ejemplo SA');
        cy.get('#sector').type('Informatica');
        cy.get('#descripcion').type('Esto es un texto descriptivo para una empresa que debe ocupar un minimo de caracteres');

        cy.get('#btnRegist').click();
        cy.wait(5000);
        cy.visit('https://bolsatrabajovdg.netlify.app');
        //cy.visit('http://localhost:4200/', '{ timeout: 20000 }');
        cy.get('#login').click();

        cy.url().should('include', '/login')
        cy.get('#email').type('empresa@gmail.com');
        cy.get('#password').type('123');
        cy.contains('Enviar').click();

        cy.get('#message').should('have.text', 'Usuario desactivado,contacte con el administrador', '{ timeout: 20000 }')
    })
})