import { gql, useMutation } from '@apollo/client';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { FormInput, FormPanel } from 'components/FormPanel';

import logo from 'media/logo.png';

import { storeLoginCredentials } from 'utils/auth';

import theme from './theme.module.scss';

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    signup(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        id
        fullName
      }
    }
  }
`;

const Signup: FC = () => {
  const navigate = useNavigate();
  const [signup, { error, loading }] = useMutation(SIGNUP_MUTATION);

  return (
    <div className={theme.container}>
      <NavLink to="/" className={theme.logoContainer}>
        <img className={theme.logo} src={logo} alt="Gujrati logo" height={48} />
      </NavLink>
      <div className={theme.inner}>
        <h2>Create an Gujrati account</h2>
        <FormPanel
          loading={loading}
          error={error}
          onSubmit={formData => {
            signup({
              variables: {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
              },
            }).then(({ data }) => {
              if (data?.signup?.token) {
                storeLoginCredentials(data.signup.user, `Bearer ${data.signup.token}`);
                navigate('/');
              }
            });
          }}
          submitButtonLabel="Create"
        >
          <FormInput
            fieldName="firstName"
            type="string"
            defaultValue=""
            label="First Name"
            fullWidth
          />
          <FormInput
            fieldName="lastName"
            type="string"
            defaultValue=""
            label="Last Name"
            fullWidth
          />
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
          Have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
