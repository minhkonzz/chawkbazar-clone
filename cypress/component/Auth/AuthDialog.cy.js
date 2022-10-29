import Home from "../../../src/pages/Home"
import { Provider as ReduxStoreProvider } from 'react-redux';
import store from '../../../src/store/ReduxStore'

describe('AuthDialog.cy.js', () => {
  it('test auth component', () => {
    cy.viewport(1280, 960);
    cy.mount(
      <ReduxStoreProvider store={store}>
        <Home />
      </ReduxStoreProvider>  
    );
  })
})