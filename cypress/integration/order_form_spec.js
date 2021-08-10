describe('Order Form', () => {

     beforeEach(() => {
        cy.fixture("emptyOrder").then((emptyOrderData) => {
            cy.intercept('http://localhost:3001/api/v1/orders', emptyOrderData)
        })
        cy.visit('http://localhost:3000')
    })

    it('User should see the order form', () => {
        cy.get('form').should('be.visible')

    })

    it('Form should have an empty input for users name', () => {
        cy.get('input').should('have.value', '')
    })
    
    it('Form should have buttons all ingredient options', () => {
        cy.get('button').should('have.length', 13)
    })

    it('User should see message that nothing has been selected', () => {
        cy.get('.empty-msg').contains('Nothing selected')
    })

    it('User should see an error message if they tried to submit without finishing the form', () => {
        cy.get('.submit-btn').click().get('.err-msg').contains('Please fill out name and ingredients!')
    })

    it('User should see a button to submit the order', () => {
        cy.get('.submit-btn').should('be.visible')
    })

    it('User should see that their order was captured after clicking submit', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            statusCode: 201,
            body: {
                name: 'Matilda',
                ingredients: ['beans']
            }
        })
        cy.get('input').type('Matilda').should('have.value', "Matilda")
        .get('button').first().click()
        .get(".submit-btn").click()
    })
})

//// OH MY GOSH! I started doing this sad path testing that I have never done before and then saw in the chat that we did not have to. But I'm glad I have it a try anyway! Leaving in here for non-existant points.


// describe('Error handling for post', () => {

//     it('User should see an error if the post failed', () => {
//         cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
//             statusCode: 500,
//             response: {
//                 message: 'Something went wrong, please try again later'
//             }
//         })
//         cy.get('input').type('Matilda').should('have.value', "Matilda")
//         .get('button').first().click()
//         .get(".submit-btn").click()
//         .get('.err-msg').contains('Sorry, our servers are down')
//     })
// })