import { users } from 'data/index';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DataTable from 'components/DataTable';
import Navbar from 'components/Navbar';

const UsersPage: FC = () => {
  const navigate = useNavigate();

  const renderContent = () => {
    return (
      <div>
        <DataTable
          data={users}
          searchFields={['email', 'userName']}
          onClick={user => navigate(`/users/${user.id}`)}
          columns={[
            {
              label: 'Name',
              fieldName: 'userName',
            },
            {
              label: 'Email',
              fieldName: 'email',
            },
            {
              label: 'Degree',
              fieldName: 'degree',
            },
            {
              label: 'Age',
              fieldName: 'age',
              type: 'NUMBER',
            },
            {
              label: 'Marital Status',
              fieldName: 'maritalStatus',
            },
            {
              label: 'Children',
              fieldName: 'children',
              type: 'NUMBER',
            },
            {
              label: 'Profession',
              fieldName: 'profession',
            },
            {
              label: 'Status',
              fieldName: 'status',
              type: 'STATUS',
            },
            {
              label: 'Created At',
              fieldName: 'createdAt',
              type: 'DATETIME',
            },
          ]}
          // hasNextPage={pageInfo.hasNextPage}
          // onLoadMore={() =>
          //   fetchMore({
          //     variables: {
          //       cursor: pageInfo.cursor,
          //     },
          //   })
          // }
        />
      </div>
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Users" />
      {renderContent()}
    </SidebarLayout>
  );
};

export default UsersPage;
