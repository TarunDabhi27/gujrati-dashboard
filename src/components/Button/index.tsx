import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import theme from './theme.module.scss';

const Button: FC<{
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: 'contained' | 'text';
  disabled?: boolean;
}> = ({ className, children, onClick, variant, disabled }) => {
  return (
    <button
      className={classNames(theme.button, variant === 'text' ? theme.text : null, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
