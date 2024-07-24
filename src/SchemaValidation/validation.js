import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  password: yup.string().required().min(6),

  email: yup.string().email("Email Wrong format").min(3),
});
