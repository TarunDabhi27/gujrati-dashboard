import { gql, useMutation } from '@apollo/client';
import { FC } from 'react';

import ConfirmButton from 'components/ConfirmButton';

type DestroyDeploymentMutationResponse = {
  id: string;
  status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'FAILED' | 'CANCELLED';
};

type DestroyDeploymentMutationVariables = {
  id: string;
};

const DESTROY_DEPLOYMENT = gql`
  mutation DestroyDeployment($id: ID!) {
    destroyDeployment(id: $id) {
      id
      status
    }
  }
`;

const DestroyDeployment: FC<{
  id: string;
}> = ({ id }) => {
  const [destroyDeployment, { loading, error }] = useMutation<
    DestroyDeploymentMutationResponse,
    DestroyDeploymentMutationVariables
  >(DESTROY_DEPLOYMENT);

  return (
    <ConfirmButton
      onConfirm={() =>
        destroyDeployment({
          variables: {
            id,
          },
        })
      }
      loading={loading}
      error={error}
      description="This will destroy this deployment?."
    >
      Destroy Deployment
    </ConfirmButton>
  );
};
export default DestroyDeployment;
