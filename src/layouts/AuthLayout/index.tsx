import { Grid } from '@mui/material';
import { FC } from 'react';

const AuthLayout: FC<{ children: any }> = props => {
  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid item xs={11} md={6} lg={3} xl={3}>
        <div>{props.children}</div>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
