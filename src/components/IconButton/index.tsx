import { FC } from 'react';

import theme from './theme.module.scss';

const IconButton: FC<{
  icon: string;
  onClick?: () => any;
}> = ({ icon, onClick }) => {
  function getIcon() {
    switch (icon) {
      case '':
        return '';
    }
  }

  return (
    <div className={theme.buttonContainer}>
      <img className={theme.icon} src={getIcon()} alt={icon} onClick={onClick} />
    </div>
  );
};

export default IconButton;
