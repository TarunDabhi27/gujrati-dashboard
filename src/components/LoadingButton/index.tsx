import { CircularProgress } from '@mui/material';
import { FC } from 'react';

import Button from 'components/Button';

const LoadingButton: FC<{
  className?: string;
  onClick?: () => any;
  loading?: boolean;
  variant?: 'contained' | 'text';
  disabled?: boolean;
  children: string;
}> = ({ className, onClick, loading = false, children, variant, disabled = false }) => {
  return (
    <div
      className={className}
      style={{ position: 'relative', textAlign: 'center', width: 'fit-content' }}
    >
      <Button variant={variant} disabled={loading || disabled} onClick={onClick}>
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </div>
  );
};

export default LoadingButton;
