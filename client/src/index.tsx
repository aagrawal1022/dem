import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./AppRouter";
import { Provider } from "react-redux";
import { store } from "store/store";
import { login } from "store/slices/authSlice";
import { ApolloProvider } from "@apollo/client";
import { client } from "config/apollo.config";

const loggedInUser = localStorage.getItem("user");
if (loggedInUser) {
  store.dispatch(login(JSON.parse(loggedInUser)));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);
