import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import Constants from 'expo-constants';

import Text from './Text';
import theme from '../theme';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground || '#24292e',
  },
  scroll: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  tabText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ to, onPress, children }) => {
  if (onPress) {
    return (
      <Pressable style={styles.tab} onPress={onPress}>
        <Text style={styles.tabText}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab} underlayColor="transparent">
      <Text style={styles.tabText}>{children}</Text>
    </Link>
  );
};

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  const isSignedIn = data && data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {isSignedIn ? (
          <AppBarTab onPress={signOut}>Sign out</AppBarTab>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;