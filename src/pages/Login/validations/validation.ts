import * as Yup from "yup";
const ValidationSchema = Yup.object().shape({
  nameOrEmail: Yup.string().required("Name or Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ).min(5)
});

export default ValidationSchema;