import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DataTable from 'components/DataTable';
import ErrorMessage from 'components/ErrorMessage';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

type Repository = {
  id: string;
  name: string;
  fullName: string;
  owner: {
    id: string;
    userName: string;
  };
  status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'DRAFT';
  updatedAt: string;
  createdAt: string;
};

type RepositoriesQueryResponse = {
  repositories: {
    nodes: Repository[];
    pageInfo: {
      hasNextPage: boolean;
      cursor: string;
    };
  };
};

const REPOSITORIES_QUERY = gql`
  query Repositories($filters: RepositoriesFilterType, $cursor: ID, $limit: Int) {
    repositories(filters: $filters, cursor: $cursor, limit: $limit) {
      nodes {
        id
        name
        fullName
        owner {
          id
          userName
        }
        status
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

const Repositories: FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch, fetchMore } = useQuery<RepositoriesQueryResponse>(
    REPOSITORIES_QUERY,
    {
      variables: {
        limit: 10,
      },
    }
  );

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    if (!data.repositories.nodes) return <div>No data found</div>;

    const deployments = data.repositories.nodes;
    const pageInfo = data.repositories.pageInfo;

    return (
      <div>
        <DataTable
          data={deployments}
          searchFields={['name', 'owner.userName']}
          onClick={repository => navigate(`/repositories/${repository.id}`)}
          columns={[
            {
              label: 'Name',
              fieldName: 'name',
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
      <Navbar title="Repositories" />
      {renderContent()}
    </SidebarLayout>
  );
};

export default Repositories;
