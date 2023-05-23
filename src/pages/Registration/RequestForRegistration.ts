import axios, { AxiosError } from "axios";

const sendRegistrationRequest = async (data: FormData): Promise<any> => {
  try {
    await axios.post("https://movies-doxx.onrender.com/api/register", data);
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

export default sendRegistrationRequest;