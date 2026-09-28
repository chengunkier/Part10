import { View, Image, Pressable, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  top: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flex: 1,
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: theme.fontWeights.bold,
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    marginBottom: 6,
  },
  language: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statCount: {
    fontWeight: theme.fontWeights.bold,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const formatCount = (count) =>
  count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);

const Stat = ({ count, label }) => (
  <View style={styles.stat}>
    <Text style={styles.statCount}>{formatCount(count)}</Text>
    <Text>{label}</Text>
  </View>
);

const RepositoryItem = ({ item, showGithubButton = false }) => (
  <View testID="repositoryItem" style={styles.container}>
    <View style={styles.top}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.fullName}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>

    <View style={styles.stats}>
      <Stat count={item.stargazersCount} label="Stars" />
      <Stat count={item.forksCount} label="Forks" />
      <Stat count={item.reviewCount} label="Reviews" />
      <Stat count={item.ratingAverage} label="Rating" />
    </View>

    {showGithubButton && (
      <Pressable
        style={styles.button}
        onPress={() => Linking.openURL(item.url)}
      >
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    )}
  </View>
);

export default RepositoryItem;