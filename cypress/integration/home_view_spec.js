beforeEach(() => {
    cy.fixture("mockOrder").then((orderData) => {
        cy.intercept('http://localhost:3001/api/v1/orders', orderData)
    })
    cy.visit('http://localhost:3000')
})

it('User should see home page of Burrito Builder', () => {
    cy.get("h1").contains("Burrito Builder")
})

it('User should see the order form', () => {
    cy.get("form").should('be.visible')
})

it('User should see cards with current orders', () => {
    cy.get(".order").should('be.visible')
})

it('User should see that cards contain a name and list of ingredients', () => {
    cy.get(".order-name").should('be.visible')
    cy.get(".ingredient-list").should('be.visible')
})

it('If there are no orders shown there should be a displayed error message', () => {
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3001/api/v1/orders'
    },
    {
        statusCode: 404,
        body: {
            message: 'No orders yet!'
        }
    })
    .get(".err-msg").contains('No orders yet!')
})