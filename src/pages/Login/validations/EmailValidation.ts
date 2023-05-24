import * as Yup from "yup";
const EmailValidation = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
});

export default EmailValidation;