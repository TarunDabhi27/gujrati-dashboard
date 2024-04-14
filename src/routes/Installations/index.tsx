import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DataTable from 'components/DataTable';
import ErrorMessage from 'components/ErrorMessage';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

type Installation = {
  id: string;
  installationReference: string;
  owner: {
    id: string;
    userName: string;
  };
  status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'DRAFT';
  isOwnedByOrganization: boolean;
  createdAt: string;
  updatedAt: string;
};

type InstallationsQueryResponse = {
  installations: {
    nodes: Installation[];
    pageInfo: {
      hasNextPage: boolean;
      cursor: string;
    };
  };
};

const INSTALLATIONS_QUERY = gql`
  query Installations($cursor: ID, $limit: Int) {
    installations(cursor: $cursor, limit: $limit) {
      nodes {
        id
        installationReference
        owner {
          id
          userName
        }
        status
        isOwnedByOrganization
        updatedAt
        createdAt
      }
      pageInfo {
        cursor
        hasNextPage
        totalCount
      }
    }
  }
`;

const Installations: FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch, fetchMore } = useQuery<InstallationsQueryResponse>(
    INSTALLATIONS_QUERY,
    {
      variables: {
        limit: 30,
      },
    }
  );

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    if (!data.installations.nodes) return <div>No data found</div>;

    const installations = data.installations.nodes;
    const pageInfo = data.installations.pageInfo;

    return (
      <div>
        <DataTable
          data={installations}
          searchFields={['installationReference', 'owner.userName']}
          onClick={installation => navigate(`/installations/${installation.id}`)}
          columns={[
            {
              label: 'Installation Reference',
              fieldName: 'installationReference',
            },
            {
              label: 'Owner',
              fieldName: 'owner.userName',
            },
            {
              label: 'Status',
              fieldName: 'status',
              type: 'STATUS',
            },
            {
              label: 'Owned by organization',
              fieldName: 'isOwnedByOrganization',
              type: 'BOOLEAN',
            },
            {
              label: 'Created At',
              fieldName: 'createdAt',
              type: 'DATETIME',
            },
            {
              label: 'Updated At',
              fieldName: 'updatedAt',
              type: 'DATETIME',
            },
          ]}
          hasNextPage={pageInfo.hasNextPage}
          onLoadMore={() =>
            fetchMore({
              variables: {
                cursor: pageInfo.cursor,
              },
            })
          }
        />
      </div>
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Installations" />
      {renderContent()}
    </SidebarLayout>
  );
};

export default Installations;
