import { gql, useMutation } from '@apollo/client';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FormInput, FormPanel } from 'components/FormPanel';

import logo from 'media/logo.png';

import { storeLoginCredentials } from 'utils/auth';

import theme from './theme.module.scss';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
      }
    }
  }
`;

const Login: FC = () => {
  const navigate = useNavigate();
  const [login, { error, loading }] = useMutation(LOGIN_MUTATION);

  return (
    <div className={theme.container}>
      <NavLink to="/" className={theme.logoContainer}>
        <img className={theme.logo} src={logo} alt="Gujrati logo" height={48} />
      </NavLink>
      <div className={theme.inner}>
        <h2>Sign in to Gujrati</h2>
        <FormPanel
          loading={loading}
          error={error}
          onSubmit={formData => {
            if (
              formData.email === 'tarundabhi@gmail.com' &&
              btoa(formData.password) === 'VGFydW4uMjc='
            ) {
              storeLoginCredentials(formData.email, `Bearer ${btoa(formData.password)}`);
              navigate('/');
            }
          }}
          submitButtonLabel="Login"
        >
          <FormInput fieldName="email" type="string" defaultValue="" label="Email" fullWidth />
          <FormInput
            fieldName="password"
            type="password"
            defaultValue=""
            label="Password"
            fullWidth
          />
        </FormPanel>
        <p className={theme.information}>
          New to Gujrati? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
