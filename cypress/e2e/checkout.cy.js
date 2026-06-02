describe('Proceso de compra - SauceDemo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('contain', '/inventory.html')
    })

    it('Debe finalizar una compra con datos validos', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="firstName"]').type('Juan')
        cy.get('[data-test="lastName"]').type('Perez')
        cy.get('[data-test="postalCode"]').type('5000')

        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()

        cy.contains('Thank you for your order!')
            .should('exist')
    })

    it('Debe mostrar una alerta cuando faltan datos obligatorios', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="error"]')
            .should('contain', 'First Name is required')
            .and('be.visible')
    })

})