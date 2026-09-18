import { TextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 10,
    fontSize: theme.fontSizes.body,
    marginBottom: 15,
  },
});

const FormikTextInput = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

export default FormikTextInput;