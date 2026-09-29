import { FlatList, View, StyleSheet } from 'react-native';

import { ReviewItem } from './SingleRepository';
import Text from './Text';
import useMyReviews from '../hooks/useMyReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { reviews, loading, error } = useMyReviews();

  if (error) {
    return <Text style={{ padding: 15 }}>Error: {error.message}</Text>;
  }

  if (loading && !reviews) {
    return <Text style={{ padding: 15 }}>Loading...</Text>;
  }

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  if (reviewNodes.length === 0) {
    return <Text style={{ padding: 15 }}>You have no reviews yet.</Text>;
  }

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;