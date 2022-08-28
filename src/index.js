import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import "./grid.css"
import "./index.css"
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider as StoreProvider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <StoreProvider store={store}>
      <Router />
   </StoreProvider>
);

reportWebVitals();
