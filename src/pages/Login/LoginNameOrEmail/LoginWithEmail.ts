
import axios, { AxiosError } from "axios";
import { loginEmail } from "../../../types";

export const LoginWithEmail = async (data: loginEmail) => {
  try {
    const response  = await axios.post("https://entertainment-api-production.up.railway.app/api/login/email", {
      email: data.email,
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
