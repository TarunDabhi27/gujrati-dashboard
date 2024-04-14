import { users } from 'data/index';
import { FC } from 'react';

import SidebarLayout from 'layouts/SidebarLayout';

import Button from 'components/Button';
import DetailsPanel from 'components/DetailsPanel';
import Navbar from 'components/Navbar';

import { logout } from 'utils/auth';

const SettingsPage: FC = () => {
  const renderContent = () => {
    const user = users[0];

    return (
      <>
        <DetailsPanel
          title="User Details"
          data={[
            // { label: 'Avatar', value: user.image, type: 'IMAGE' },
            // { label: 'First Name', value: user.firstName },
            // { label: 'Last Name', value: user.lastName },
            { label: 'User Name', value: user.userName },
            { label: 'Email', value: user.email },
          ]}
        />
        <Button onClick={logout}>Logout</Button>
      </>
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Settings" />
      {renderContent()}
    </SidebarLayout>
  );
};

export default SettingsPage;
