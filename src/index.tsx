import "./styles/index.scss";
import * as History from "history";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import App from "./App";
import createStore from "./reducks/store/store";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
