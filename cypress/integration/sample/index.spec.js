import { isPermissionAllowed } from 'cypress-browser-permissions'

describe('testing the index file', () => {
    isPermissionAllowed('camera') && isPermissionAllowed('microphone') && it('visit the page', () => {
        cy.visit('http://localhost:5000/sample/index.html')

        cy.contains('Stats').click()

        cy.contains('Realtime Stats').should('be.visible')

        cy.contains('Back to Screen').click()

        cy.contains('Share Screen').click()

        cy.get('.self').trigger('ended')
    })
})
