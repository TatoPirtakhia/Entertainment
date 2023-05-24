import axios from "axios";

const SendRecoveryPassword = async (data:any) => {
  try {
    await axios.post("https://movies-doxx.onrender.com/api/password/recovery", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendRecoveryPassword;