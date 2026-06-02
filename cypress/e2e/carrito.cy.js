describe('Funcionalidades del carrito de compras', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')

        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('contain', '/inventory.html')
    })

    it('Debe agregar un producto y actualizar el contador', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('.shopping_cart_badge')
            .should('be.visible')
            .and('have.text', '1')

        cy.get('[data-test="remove-sauce-labs-backpack"]')
            .should('exist')
    })

    it('Debe reflejar la cantidad correcta al agregar varios productos', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()

        cy.get('.shopping_cart_badge')
            .should('contain', '3')

        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible')
        cy.get('[data-test="remove-sauce-labs-onesie"]').should('be.visible')
    })

    it('Debe eliminar un articulo desde el carrito', () => {

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('.shopping_cart_badge')
            .should('have.text', '2')

        cy.get('.shopping_cart_link').click()

        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        cy.get('.shopping_cart_badge')
            .should('contain', '1')

        cy.contains('Sauce Labs Backpack')
            .should('not.exist')
    })

})