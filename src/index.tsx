import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createUploadLink } from 'apollo-upload-client';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { getToken, logout } from 'utils/auth';
import paginationHelper from 'utils/pagination-helper';

import './index.scss';
import reportWebVitals from './reportWebVitals';
import App from './routes';

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_INDIA_BACKEND,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions }) => {
      if (extensions && extensions.code === 'UNAUTHENTICATED') logout();
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: getToken(),
      'Apollo-Require-Preflight': 'true',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  connectToDevTools: process.env.NODE_ENV !== 'production',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          deployments: paginationHelper(),
          repositories: paginationHelper(),
          installations: paginationHelper(),
          users: paginationHelper(),
        },
      },
      DealType: {
        fields: {
          closings: paginationHelper(),
        },
      },
    },
  }),
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#fa9602',
    },
  },
  typography: {
    fontFamily: `'Gujrati', sans-serif`,
  },
});

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
