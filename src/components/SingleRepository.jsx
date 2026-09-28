import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 2,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingCircle}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContent}>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>
        {format(new Date(review.createdAt), 'dd MMM yyyy')}
      </Text>
      <Text>{review.text}</Text>
    </View>
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (error) {
    return <Text style={{ padding: 15 }}>Error: {error.message}</Text>;
  }

  if (!repository) {
    return (
      <Text style={{ padding: 15 }}>
        {loading ? 'Loading...' : 'Repository not found'}
      </Text>
    );
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <RepositoryItem item={repository} showGithubButton />
          <ItemSeparator />
        </View>
      }
    />
  );
};

export default SingleRepository;