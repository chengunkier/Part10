import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  if (error) console.log('Repositories error:', error);

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;