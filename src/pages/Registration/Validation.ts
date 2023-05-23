import * as Yup from "yup";
const ValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain  lowercase, uppercase letter, min one number"
    ).min(4),
    repeatPassword: Yup.string()
    .required("Repeat Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

});

export default ValidationSchema;
