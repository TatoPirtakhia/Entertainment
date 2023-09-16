import axios, { AxiosError } from "axios";
import { loginGoogle } from "../../../types";

const loginWithGoogle = async (data: loginGoogle) => {
  try {
    const response = await axios.post(
      "http://localhost:3005/api/loginWithGoogle",
      {
        name: data.name,
      }
    );
    return response.data;
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

export default loginWithGoogle;
