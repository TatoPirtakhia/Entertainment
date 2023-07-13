import axios from "axios";
import { SendRecoveryPassword } from "../../../types";

const SendRecoveryPassword = async (data:SendRecoveryPassword) => {
  try {
    await axios.post("https://entertainment-api-production.up.railway.app/api/password/recovery", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendRecoveryPassword;