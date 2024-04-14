import { Box, Grid } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import logo from 'media/logo.png';

import theme from './theme.module.scss';

const ErrorLayout: FC<{ title?: string; children: any }> = props => {
  const navigate = useNavigate();

  return (
    <Grid container justifyContent="center" alignContent="center">
      <Grid item xs={11} md={6} lg={5} xl={4}>
        <div className={theme.logoContainer}>
          <img className={theme.logo} src={logo} alt="Gujrati Logo" onClick={() => navigate('/')} />
        </div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
          }}
        >
          <div>{props.children}</div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ErrorLayout;
