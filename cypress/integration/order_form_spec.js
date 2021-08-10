describe('Home page', () => {

    beforeEach(() => {
        cy.fixture("mockOrder").then((orderData) => {
            cy.intercept('http://localhost:3001/api/v1/orders', orderData)
        })
        cy.visit('http://localhost:3000')
    })

    it('User should see the order form', () => {
        cy.get("form").should('be.visible')

    })

      it('Form should have input for name', () => {

    })
    
    it('Form should have buttons all ingredient options', () => {

    })

     it('User should see an error message if they tried to submit without finishing the form', () => {

    })

    it('User should see a button to submit the order', () => {
    })

    it('User should see that their order was captured after clicking submit', () => {
    })

    
})

// You should see a button to click to submit the order

describe("Error handling", () => {
    it('User should see an error if the post failed', () => {
    })
})