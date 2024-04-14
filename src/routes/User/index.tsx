import { users } from 'data/index';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DetailsPanel from 'components/DetailsPanel';
import Navbar from 'components/Navbar';

const UserPage: FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  const renderContent = () => {
    const user = users.filter(user => user.id === userId)[0];

    return (
      <DetailsPanel
        title="User Details"
        data={[
          { label: 'User Name', value: user.userName },
          { label: 'City', value: user.city },
          { label: 'Degree', value: user.degree },
          { label: 'Age', value: user.age, type: 'NUMBER' },
          { label: 'Marital Status', value: user.maritalStatus },
          { label: 'Children', value: user.children, type: 'NUMBER' },
          { label: 'Profession', value: user.profession },
          { label: 'Role', value: user.role },
          { label: 'Email', value: user.email },
          { label: 'Status', value: user.status, type: 'STATUS' },
          { label: 'Created AT', value: user.createdAt, type: 'DATETIME' },
        ]}
      />
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="User" onBackButtonClick={() => navigate(-1)} />
      {renderContent()}
    </SidebarLayout>
  );
};

export default UserPage;
