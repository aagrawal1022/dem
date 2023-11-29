import React from "react";
import ReactDOM from "react-dom";
import App from "./AppRouter";
import { Provider } from "react-redux";
import { store } from "store/store";
import { login } from "store/slices/authSlice";

const loggedInUser = localStorage.getItem("user");
if (loggedInUser) {
  store.dispatch(login(JSON.parse(loggedInUser)));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
