import { Box } from '@mui/material';
import { FC } from 'react';

import Sidebar from 'components/Sidebar';

import getSidebarTabsForProfile from 'utils/sidebar-tabs';

import theme from './theme.module.scss';

const SidebarLayout: FC<{ children: any }> = props => {
  const renderContent = () => {
    return (
      <>
        <div className={theme.sidebarContainer}>
          <Sidebar tabs={getSidebarTabsForProfile()} />
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
      </>
    );
  };

  return <Box sx={{ display: 'flex' }}>{renderContent()}</Box>;
};

export default SidebarLayout;
