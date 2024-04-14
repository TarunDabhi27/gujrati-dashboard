import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DetailsPanel from 'components/DetailsPanel';
import ErrorMessage from 'components/ErrorMessage';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

type RepositoryQueryResponse = {
  repository: {
    id: string;
    name: string;
    owner: {
      userName: string;
    };
    status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'DRAFT';
    updatedAt: string;
    createdAt: string;
  };
};

const REPOSITORY_QUERY = gql`
  query Repository($id: ID!) {
    repository(id: $id) {
      id
      name
      owner {
        userName
      }
      status
      updatedAt
      createdAt
    }
  }
`;

const Repository: FC = () => {
  const navigate = useNavigate();
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const { loading, error, data, refetch } = useQuery<RepositoryQueryResponse>(REPOSITORY_QUERY, {
    variables: {
      id: repositoryId,
    },
  });

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    const repository = data.repository;

    return (
      <DetailsPanel
        title="Repository Details"
        data={[
          { label: 'Repository Name', value: repository.name },
          { label: 'Owner (User Name)', value: repository.owner.userName },
          { label: 'Status', value: repository.status, type: 'STATUS' },
          { label: 'Created AT', value: repository.createdAt, type: 'DATETIME' },
          { label: 'Updated AT', value: repository.updatedAt, type: 'DATETIME' },
        ]}
      />
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Repository" onBackButtonClick={() => navigate(-1)} />
      {renderContent()}
    </SidebarLayout>
  );
};

export default Repository;
