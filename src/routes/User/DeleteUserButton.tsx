import { gql, useMutation } from '@apollo/client';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmButton from 'components/ConfirmButton';

type RemoveUserMutationResponse = {
  removeUser: {
    id: string;
  };
};

type RemoveUserMutationVariables = {
  id: string;
};

const REMOVE_USER_MUTATION = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;

const RemoveUserButton: FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

  const [removeUser, { loading, error }] = useMutation<
    RemoveUserMutationResponse,
    RemoveUserMutationVariables
  >(REMOVE_USER_MUTATION, {
    update(cache, { data }) {
      if (!data) return;
      cache.modify({
        fields: {
          users(existingUsersRef, { readField }) {
            const updatedUsersRef = { ...existingUsersRef };
            updatedUsersRef.nodes = existingUsersRef.nodes.filter(
              userRef => id !== readField('id', userRef)
            );
            return updatedUsersRef;
          },
        },
      });
    },
    onCompleted() {
      navigate('/users');
    },
  });

  return (
    <>
      <ConfirmButton
        onConfirm={() => removeUser({ variables: { id } })}
        loading={loading}
        error={error}
        description="This will delete all data concerning this User including any deals."
      >
        Remove
      </ConfirmButton>
    </>
  );
};

export default RemoveUserButton;
