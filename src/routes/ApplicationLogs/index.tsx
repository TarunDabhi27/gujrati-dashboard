import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import ErrorMessage from 'components/ErrorMessage';
import HorizontalTabs from 'components/HorizontalTabs';
import LoadingIndicator from 'components/LoadingIndicator';
import LogViewer from 'components/LogViewer';
import Navbar from 'components/Navbar';

type Log = {
  message: string;
  createdAt: string;
};

type DeploymentUsersQueryResponse = {
  deployment: {
    id: string;
    grafanaLogs: {
      nodes: [Log];
    };
  };
};

type DeploymentUsersQueryVariables = {
  deploymentId: string;
  limit: number;
  sortOrder: 'FORWARD' | 'BACKWARD';
};

const DEPLOYMENT_QUERY = gql`
  query DeploymentGrafanaLogs(
    $deploymentId: ID!
    $limit: Int!
    $sortOrder: GrafanaLogsSortOrderEnumType
  ) {
    deployment(id: $deploymentId) {
      id
      grafanaLogs(limit: $limit, sortOrder: $sortOrder) {
        nodes {
          createdAt
          message
        }
      }
    }
  }
`;

const ApplicationLogs = () => {
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery<
    DeploymentUsersQueryResponse,
    DeploymentUsersQueryVariables
  >(DEPLOYMENT_QUERY, {
    variables: {
      deploymentId: deploymentId || '',
      limit: 100,
      sortOrder: 'BACKWARD',
    },
    pollInterval: 2000,
  });

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error) return <ErrorMessage error={error} refetch={refetch} />;

    if (data) {
      const logs = [...data.deployment.grafanaLogs.nodes].reverse() || [];

      return (
        <>
          <HorizontalTabs
            tabs={[
              {
                key: 'overview',
                label: 'Overview',
                route: `/deployments/${deploymentId}`,
                exact: true,
              },
              {
                key: 'buildLog',
                label: 'Build Log',
                route: `/deployments/${deploymentId}/build-logs`,
                exact: true,
              },
              {
                key: 'applicationLog',
                label: 'Application Log',
                route: `/deployments/${deploymentId}/application-logs`,
                exact: true,
              },
            ]}
          />
          <LogViewer logs={logs} />
        </>
      );
    }
  };

  return (
    <SidebarLayout>
      <Navbar title="Application Logs" onBackButtonClick={() => navigate('/deployments')} />
      {renderContent()}
    </SidebarLayout>
  );
};

export default ApplicationLogs;
