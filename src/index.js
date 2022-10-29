import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import "./grid.css"
import "./index.css"
import * as dotenv from "dotenv"
import reportWebVitals from './reportWebVitals';
import store from './store/ReduxStore';
import { Provider as ReduxStoreProvider } from 'react-redux';

dotenv.config(); 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ReduxStoreProvider store={store}>
      <Router />
   </ReduxStoreProvider>
);

reportWebVitals();
