import { ApolloError } from '@apollo/client';
import { Alert, Snackbar } from '@mui/material';
import { FC, useEffect, useState } from 'react';

import Button from 'components/Button';

import theme from './theme.module.scss';

type ErrorMessageProps = {
  error: ApolloError | boolean | string | undefined;
  refetch?: () => void;
  type?: 'standard' | 'alert' | 'snackbar';
};

const ErrorMessage: FC<ErrorMessageProps> = ({ refetch, error, type = 'standard' }) => {
  const [openSnackbar, toggleSnackbar] = useState(false);
  const [refetchAttempt, setRefetchAttempt] = useState(0);

  useEffect(() => {
    if (type === 'snackbar' && error) {
      toggleSnackbar(true);
    }
  }, [error, type]);

  function getErrorMessage() {
    if (error && typeof error === 'object' && error.graphQLErrors) {
      const graphQLError = error.graphQLErrors[0];
      const code =
        graphQLError && graphQLError.extensions
          ? graphQLError.extensions.code
          : 'INTERNAL_SERVER_ERROR';
      switch (code) {
        case 'INTERNAL_SERVER_ERROR':
          return 'There was an issue processing this request. Please try again later.';
        case 'RESOURCE_NOT_FOUND':
          return 'The requested resource could not be found. Please try a different one.';
        case 'BAD_USER_INPUT':
          return graphQLError.message
            ? graphQLError.message
            : 'An incorrect value was provided in this action';
        case 'UNAUTHENTICATED':
          return 'You need to be authenticated to perform this action. Please log in and try again.';
        case 'FORBIDDEN':
          return "You don't have the necessary permissions to perform this action";
        case 'GRAPHQL_PARSE_FAILED':
          return 'You seem to have encountered a bug. Please report this issue and our team will fix this for you right away.';
        case 'GRAPHQL_VALIDATION_FAILED':
          return 'You seem to have encountered a bug. Please report this issue and our team will fix this for you right away.';
        default:
          return 'There was an issue processing this request. Please try again later.';
      }
    }
    return 'There was an issue processing this request. Please try again later.';
  }

  if (type === 'alert') {
    return (
      <Alert sx={{ marginTop: 2, marginBottom: 2 }} severity="error">
        {getErrorMessage()}
      </Alert>
    );
  }

  if (type === 'snackbar') {
    return (
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={() => toggleSnackbar(false)}>
        <Alert severity="error" onClose={() => toggleSnackbar(false)}>
          {getErrorMessage()}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <div className={theme.errorContainer}>
      <p>{getErrorMessage()}</p>
      {refetch && refetchAttempt < 2 ? (
        <Button
          onClick={() => {
            setRefetchAttempt(refetchAttempt + 1);
            refetch();
          }}
        >
          Retry
        </Button>
      ) : null}
      {refetchAttempt > 1 ? (
        <Button
          onClick={() => {
            setRefetchAttempt(refetchAttempt + 1);
          }}
        >
          Report Issue
        </Button>
      ) : null}
    </div>
  );
};

export default ErrorMessage;
