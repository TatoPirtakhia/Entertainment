
import axios, { AxiosError } from "axios";

export const LoginWithEmail = async (data: any) => {
  try {
    const response  = await axios.post("http://localhost:3005/api/login/email", {
      email: data.nameOrEmail,
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
export const isEmail = (email: string): boolean => {
  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
