import { TextInput, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 10,
    fontSize: theme.fontSizes.body,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    marginTop: 5,
  },
});

const FormikTextInput = ({ error, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        {...props}
      />
      {error && (
        <Text style={styles.errorText} color="error">
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormikTextInput;