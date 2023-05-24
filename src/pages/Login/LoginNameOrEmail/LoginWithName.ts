import axios, { AxiosError } from "axios";

const LoginWithName = async (data: any) => {
  try {
    const response = await axios.post("http://localhost:3005/api/login/name", {
      name: data.nameOrEmail,
      password: data.password,
    });
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw axiosError.response.data;
      }
    }
    console.log(error);
    throw error;
  }
};

export default LoginWithName;
