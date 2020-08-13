import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
import {
  ApolloClient,
  InMemoryCache,
  //createHttpLink,
  ApolloProvider
} from "@apollo/client";
// import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
/* const link = createHttpLink({
  uri: "https://api.github.com/graphql"
}); */
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: cache,
  // link: link,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  }
});

/* // Instantiate required constructor fields
const cache = new InMemoryCache();
const link = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const client = new ApolloClient({
  // Provide required constructor fields
  cache: cache,
  link: link,

  // Provide some optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
}); */

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
