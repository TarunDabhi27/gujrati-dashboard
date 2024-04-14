import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DetailsPanel from 'components/DetailsPanel';
import ErrorMessage from 'components/ErrorMessage';
import HorizontalTabs from 'components/HorizontalTabs';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

import CancelDeployment from './CancelDeployment';
import DestroyDeployment from './DestroyDeployment';

type DeploymentQueryResponse = {
  deployment: {
    id: string;
    branchName: string;
    baseBranchName: string;
    repository: {
      id: string;
      name: string;
    };
    status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'FAILED' | 'CANCELLED';
    url: string;
    elbUrl: string;
    user: {
      id: string;
      userName: string;
    };
    buildDuration: string;
    completedAt: string;
    expiredAt: string;
    createdAt: string;
    updatedAt: string;
  };
};

const DEPLOYMENT_QUERY = gql`
  query Deployment($id: ID!) {
    deployment(id: $id) {
      id
      branchName
      baseBranchName
      repository {
        id
        name
      }
      status
      url
      elbUrl
      user {
        id
        userName
      }
      buildDuration
      completedAt
      expiredAt
      createdAt
      updatedAt
    }
  }
`;

const DeploymentPage: FC = () => {
  const navigate = useNavigate();
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const { loading, error, data, refetch } = useQuery<DeploymentQueryResponse>(DEPLOYMENT_QUERY, {
    variables: {
      id: deploymentId,
    },
  });

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    const deployment = data.deployment;

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
        <DetailsPanel
          title="Deployment Details"
          data={[
            { label: 'Repository Name', value: deployment.repository.name },
            { label: 'Branch Name', value: deployment.branchName },
            { label: 'Base Branch Number', value: deployment.baseBranchName },
            { label: 'Status', value: deployment.status, type: 'STATUS' },
            {
              label: 'Deployment URL',
              value: deployment.url,
              type: 'EXTERNAL_LINK',
              navigateTo: deployment.url,
            },
            {
              label: 'ELB URL',
              value: deployment.elbUrl,
              type: 'EXTERNAL_LINK',
              navigateTo: deployment.elbUrl,
            },
            { label: 'Initiated By (User Name)', value: deployment.user.userName },
            { label: 'Build Duration', value: deployment.buildDuration },
            { label: 'Completed AT', value: deployment.completedAt, type: 'DATETIME' },
            { label: 'Expired AT', value: deployment.expiredAt, type: 'DATETIME' },
            { label: 'Created AT', value: deployment.createdAt, type: 'DATETIME' },
            { label: 'Updated AT', value: deployment.updatedAt, type: 'DATETIME' },
          ]}
        />
        {deployment.url && deployment.status === 'ACTIVE' && (
          <DestroyDeployment id={deployment.id} />
        )}
        {deployment.status === 'INACTIVE' && <CancelDeployment id={deployment.id} />}
      </>
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Deployment" onBackButtonClick={() => navigate('/deployments')} />
      {renderContent()}
    </SidebarLayout>
  );
};

export default DeploymentPage;
