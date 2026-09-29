import { useState } from 'react';
import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: { height: 10 },
  pickerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderingPrinciples = {
  latest: {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRated: {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRated: {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

export const RepositoryListContainer = ({
  repositories,
  onPressItem,
  principle,
  onPrincipleChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem && onPressItem(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        onPrincipleChange && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={principle}
              onValueChange={(value) => onPrincipleChange(value)}
            >
              {Object.entries(orderingPrinciples).map(([key, { label }]) => (
                <Picker.Item key={key} label={label} value={key} />
              ))}
            </Picker>
          </View>
        )
      }
    />
  );
};

const RepositoryList = () => {
  const [principle, setPrinciple] = useState('latest');
  const { orderBy, orderDirection } = orderingPrinciples[principle];

  const { repositories, loading, error } = useRepositories({
    orderBy,
    orderDirection,
  });
  const navigate = useNavigate();

  if (error) return <Text style={{ padding: 15 }}>Error: {error.message}</Text>;
  if (loading && !repositories) return <Text style={{ padding: 15 }}>Loading...</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressItem={(id) => navigate(`/repositories/${id}`)}
      principle={principle}
      onPrincipleChange={setPrinciple}
    />
  );
};

export default RepositoryList;