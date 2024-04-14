import { gql, useQuery } from '@apollo/client';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SidebarLayout from 'layouts/SidebarLayout';

import DataTable from 'components/DataTable';
import DetailsPanel from 'components/DetailsPanel';
import ErrorMessage from 'components/ErrorMessage';
import LoadingIndicator from 'components/LoadingIndicator';
import Navbar from 'components/Navbar';

type Repository = {
  id: string;
  name: string;
  status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'DRAFT';
  createdAt: string;
  updatedAt: string;
};

type InstallationQueryResponse = {
  installation: {
    id: string;
    installationReference: string;
    owner: {
      id: string;
      userName: string;
    };
    isOwnedByOrganization: boolean;
    status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'DRAFT';
    autoDeploy: boolean;
    repositories: Repository[];
    createdAt: string;
    updatedAt: string;
  };
};

const INSTALLATION_QUERY = gql`
  query Installation($id: ID!) {
    installation(id: $id) {
      id
      installationReference
      owner {
        id
        userName
      }
      isOwnedByOrganization
      status
      autoDeploy
      repositories {
        id
        name
        status
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const Installation: FC = () => {
  const navigate = useNavigate();
  const { installationId } = useParams<{ installationId: string }>();
  const { loading, error, data, refetch } = useQuery<InstallationQueryResponse>(
    INSTALLATION_QUERY,
    {
      variables: {
        id: installationId,
      },
    }
  );

  const renderContent = () => {
    if (loading) return <LoadingIndicator />;

    if (error || !data) return <ErrorMessage error={error} refetch={refetch} />;

    const installation = data.installation;

    return (
      <DetailsPanel
        title="Installation Details"
        data={[
          { label: 'Installation Reference', value: installation.installationReference },
          { label: 'Owner (User Name)', value: installation.owner.userName },
          { label: 'Status', value: installation.status, type: 'STATUS' },
          { label: 'Auto-deploy', value: installation.autoDeploy, type: 'BOOLEAN' },
          {
            label: 'Owned by organization',
            value: installation.isOwnedByOrganization,
            type: 'BOOLEAN',
          },
          { label: 'Created AT', value: installation.createdAt, type: 'DATETIME' },
          { label: 'Updated AT', value: installation.updatedAt, type: 'DATETIME' },
          {
            label: 'Repositories',
            value: (
              <>
                <DataTable
                  data={installation.repositories}
                  onClick={repository => navigate(`/repositories/${repository.id}`)}
                  columns={[
                    { label: 'Name', fieldName: 'name' },
                    { label: 'Status', fieldName: 'status', type: 'STATUS' },
                    { label: 'Created AT', fieldName: 'createdAt', type: 'DATETIME' },
                    { label: 'Updated AT', fieldName: 'updatedAt', type: 'DATETIME' },
                  ]}
                  emptyListTitle="No Repositories found!"
                  emptyListDescription=" "
                />
              </>
            ),
          },
        ]}
      />
    );
  };

  return (
    <SidebarLayout>
      <Navbar title="Installation" onBackButtonClick={() => navigate(-1)} />
      {renderContent()}
    </SidebarLayout>
  );
};

export default Installation;
