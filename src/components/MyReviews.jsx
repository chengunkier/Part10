import { FlatList, View, Pressable, Alert, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';
import useMyReviews from '../hooks/useMyReviews';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  top: {
    flexDirection: 'row',
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
  content: {
    flex: 1,
  },
  repositoryName: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 2,
  },
  date: {
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    flex: 1,
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewItem = ({ review, onViewRepository, onDelete }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.top}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.repositoryName}>
          {review.repository ? review.repository.fullName : ''}
        </Text>
        <Text style={styles.date}>
          {format(new Date(review.createdAt), 'dd MMM yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>

    <View style={styles.actions}>
      <Pressable
        style={[styles.button, styles.viewButton]}
        onPress={() => onViewRepository(review.repositoryId)}
      >
        <Text style={styles.buttonText}>View repository</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={() => onDelete(review.id)}
      >
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  </View>
);

const MyReviews = () => {
  const { reviews, loading, error, refetch } = useMyReviews();
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();

  if (error) {
    return <Text style={{ padding: 15 }}>Error: {error.message}</Text>;
  }

  if (loading && !reviews) {
    return <Text style={{ padding: 15 }}>Loading...</Text>;
  }

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview(id);
              refetch();
            } catch (e) {
              console.log(e);
            }
          },
        },
      ],
    );
  };

  if (reviewNodes.length === 0) {
    return <Text style={{ padding: 15 }}>You have no reviews yet.</Text>;
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <MyReviewItem
          review={item}
          onViewRepository={(id) => navigate(`/repositories/${id}`)}
          onDelete={handleDelete}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;