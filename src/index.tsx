import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import createSagaMiddlware from 'redux-saga';
import auth from './store/reducers/auth';
import { watchAuth } from "./store/sagas";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddlware = createSagaMiddlware()

const middlwares = [sagaMiddlware];

const reducers = { auth };

const reduxDevTools: any =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const composeEnhancers = reduxDevTools;

const rootReducer = combineReducers({ ...reducers });

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlwares))
);

sagaMiddlware.run(watchAuth);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
