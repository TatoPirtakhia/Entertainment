import * as Yup from "yup";
const PasswordSchema = Yup.object().shape({
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

export default PasswordSchema;
