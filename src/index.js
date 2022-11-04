import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css'
import App from './App';
import { reducer } from './reducers/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>
);



