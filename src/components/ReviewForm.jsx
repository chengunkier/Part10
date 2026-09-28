import { View, Pressable, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
});

export const ReviewFormContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ handleSubmit }) => (
      <View style={{ padding: 15, gap: 10 }}>
        <FormikTextInput name="ownerName" placeholder="Repository owner username" />
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
        <FormikTextInput
          name="rating"
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
        />
        <FormikTextInput name="text" placeholder="Review" multiline />
        <Pressable onPress={handleSubmit}>
          <Text>Create a review</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

const ReviewForm = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = await createReview(values);
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;