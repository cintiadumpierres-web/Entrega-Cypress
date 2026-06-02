describe('Pruebas de autenticacion - SauceDemo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
    })

    it('Debe iniciar sesion con credenciales validas', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include', '/inventory.html')
        cy.get('.app_logo').should('contain', 'Swag Labs')
    })

    it('Debe mostrar error al ingresar una contraseña incorrecta', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('123456')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username and password do not match')
    })

    it('Debe cerrar la sesion desde el menu lateral', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()

        cy.url().should('eq', 'https://www.saucedemo.com/')
    })

    it('Debe informar que el usuario es obligatorio', () => {
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Username is required')
    })

    it('Debe impedir el acceso a un usuario bloqueado', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
            .should('be.visible')
            .and('contain', 'Sorry, this user has been locked out.')
    })

})