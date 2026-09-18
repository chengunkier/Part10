import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabText: {
    color: 'white',
    fontWeight: '700',
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.tab}>
      <Text style={styles.tabText}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;