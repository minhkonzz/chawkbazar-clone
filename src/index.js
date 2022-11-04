import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import "./common/styles/index.css"
import "./common/styles/grid.css"
import reportWebVitals from './reportWebVitals';
import store from "./services/redux/store";
import { Provider as ReduxStoreProvider } from 'react-redux';
import { Provider as CurrentUserProvider } from "./context"
import currentUserReducer, { initialState } from './services/redux/store/reducers/currentUser.reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ReduxStoreProvider store={store}>
      <CurrentUserProvider reducer={currentUserReducer} initialState={initialState}>
         <Router />
      </CurrentUserProvider>
   </ReduxStoreProvider>
);

reportWebVitals();
