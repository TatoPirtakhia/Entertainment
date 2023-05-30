import axios, { AxiosError } from "axios";
import { loginName } from "../../../types";

const LoginWithName = async (data: loginName) => {
  try {
    const response = await axios.post("https://movies-doxx.onrender.com/api/login/name", {
      name: data.name,
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
