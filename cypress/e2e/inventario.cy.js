describe('inventario - Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Verificar cantidad de productos', () => {
        cy.get('[data-test="inventory-item-name"]').should('have.length', 6)
    })

    it('ordenar productos por precio (menor a mayor)', () => {
        cy.get('.product_sort_container')
            .select('lohi')
        cy.get('.product_sort_container').should('have.value', 'lohi')

        cy.get('.inventory_item_name').first().should('have.text', 'Sauce Labs Onesie')
        cy.get('.inventory_item_price').first().should('have.text', '$7.99')
    })
})