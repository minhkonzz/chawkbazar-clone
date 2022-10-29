// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'
import "../../src/grid.css"
import "../../src/index.css"
import "../../src/pages/Home/index.css"
import "../../src/pages/Home/components/Banner/index.css"
import "../../src/pages/Home/components/Contact/index.css"
import "../../src/pages/Home/components/FeaturedProducts/index.css"
import "../../src/pages/Home/components/NewCollections/index.css"
import "../../src/pages/Home/components/TopBrands/index.css"
import "../../src/common/Product/type-1/index.css"

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)