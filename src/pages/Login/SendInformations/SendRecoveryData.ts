import axios from "axios";

const SendRecoveryPassword = async (data:any) => {
  try {
    await axios.post("http://localhost:3005/api/password/recovery", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendRecoveryPassword;