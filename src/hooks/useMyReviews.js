import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';

const useMyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  return {
    reviews: data?.me?.reviews,
    loading,
    error,
    refetch,
  };
};

export default useMyReviews;