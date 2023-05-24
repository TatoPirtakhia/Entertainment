import axios from "axios";

const VerifyEmail = async (data: any) => {
  console.log(data);
  try {
    const response = await axios.post(
      "https://movies-doxx.onrender.com/api/verify",
      { hash: data }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default VerifyEmail;
