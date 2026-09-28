import { View } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (error) {
    return <Text style={{ padding: 15 }}>Error: {error.message}</Text>;
  }

  if (!repository) {
    return <Text style={{ padding: 15 }}>{loading ? 'Loading...' : 'Repository not found'}</Text>;
  }

  return (
    <View>
      <RepositoryItem item={repository} showGithubButton />
    </View>
  );
};

export default SingleRepository;