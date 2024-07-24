import * as yup from 'yup';

export const  categoryValidation = yup.object().shape({
  title: yup.string().required().min(3),

});


