import { gql, useQuery } from '@apollo/client';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DataTable from 'components/DataTable';
import ErrorMessage from 'components/ErrorMessage';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

type Deployment = {
  id: string;
  branchName: string;
  baseBranchName: string;
  status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'FAILED' | 'CANCELLED';
  repository: {
    name: string;
  };
  user: {
    userName: string;
  };
  url: string;
  createdAt: string;
  updatedAt: string;
};

type DeploymentsQueryResponse = {
  deploymentsAsSuperAdmin: {
    nodes: Deployment[];
    pageInfo: {
      hasNextPage: boolean;
      cursor: string;
    };
  };
};

const DEPLOYMENTS_QUERY = gql`
  query DeploymentsQuery(
    $cursor: ID
    $limit: Int
    $filters: DeploymentsFilterType
    $sortType: SortTypeEnumType
  ) {
    deploymentsAsSuperAdmin(
      cursor: $cursor
      limit: $limit
      filters: $filters
      sortType: $sortType
    ) {
      nodes {
        id
        branchName
        baseBranchName
        status
        repository {
          name
        }
        user {
          userName
        }
        url
        createdAt
        updatedAt
      }
      pageInfo {
        cursor
        hasNextPage
        totalCount
      }
    }
  }
`;

const Deployments: FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch, fetchMore } = useQuery<DeploymentsQueryResponse>(
    DEPLOYMENTS_QUERY,
    {
      variables: {
        limit: 30,
      },
    }
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, [refetch]);

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    if (!data.deploymentsAsSuperAdmin.nodes) return <div>No data found</div>;

    const deployments = data.deploymentsAsSuperAdmin.nodes;
    const pageInfo = data.deploymentsAsSuperAdmin.pageInfo;

    return (
      <div>
        <DataTable
          data={deployments}
          searchFields={['repository.name', 'user.userName']}
          onClick={deployment => navigate(`/deployments/${deployment.id}`)}
          columns={[
            {
              label: 'Repository',
              fieldName: 'repository.name',
            },
            {
              label: 'Branch',
              fieldName: 'branchName',
            },
            {
              label: 'Initiated By',
              fieldName: 'user.userName',
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
      <Navbar title="Deployments" />
      {renderContent()}
    </SidebarLayout>
  );
};

export default Deployments;
