import CircularProgress from '@mui/material/CircularProgress';

import theme from './theme.module.scss';

const LoadingIndicator = () => {
  return (
    <div className={theme.loadingContainer}>
      <CircularProgress />
    </div>
  );
};
export default LoadingIndicator;
