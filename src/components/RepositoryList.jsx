import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: { height: 10 },
  item: { flexDirection: 'row', padding: 15, backgroundColor: 'white' },
  avatar: { width: 50, height: 50, borderRadius: 4, marginRight: 15 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  language: { color: 'white', backgroundColor: '#0366d6', alignSelf: 'flex-start', padding: 4, borderRadius: 4, marginTop: 6 },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({ item }) => (
  <View style={styles.item}>
    <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
    <View style={styles.info}>
      <Text style={styles.name}>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.language}>{item.language}</Text>
      <Text>
        Stars: {item.stargazersCount} · Forks: {item.forksCount} · Reviews: {item.reviewCount} · Rating: {item.ratingAverage}
      </Text>
    </View>
  </View>
);

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  if (error) return <Text style={{ padding: 15 }}>Error: {error.message}</Text>;
  if (loading && !repositories) return <Text style={{ padding: 15 }}>Loading...</Text>;

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;