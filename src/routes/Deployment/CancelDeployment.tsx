import { gql, useMutation } from '@apollo/client';
import { FC } from 'react';

import ConfirmButton from 'components/ConfirmButton';

type CancelDeploymentMutationResponse = {
  id: string;
  status: 'INACTIVE' | 'ACTIVE' | 'DELETED' | 'FAILED' | 'CANCELLED';
};

type CancelDeploymentMutationVariables = {
  id: string;
};

const CANCEL_DEPLOYMENT = gql`
  mutation CancelOperation($id: ID!) {
    cancelOperation(id: $id) {
      id
      status
    }
  }
`;

const CancelDeployment: FC<{
  id: string;
}> = ({ id }) => {
  const [cancelDeployment, { loading, error }] = useMutation<
    CancelDeploymentMutationResponse,
    CancelDeploymentMutationVariables
  >(CANCEL_DEPLOYMENT);

  return (
    <ConfirmButton
      onConfirm={() =>
        cancelDeployment({
          variables: {
            id,
          },
        })
      }
      loading={loading}
      error={error}
      description="This will cancel this deployment?."
    >
      Cancel Deployment
    </ConfirmButton>
  );
};
export default CancelDeployment;
