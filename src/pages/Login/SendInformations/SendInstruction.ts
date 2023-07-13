import axios from "axios";
import { SendInstructions } from "../../../types";

const SendInstructions = async (data: SendInstructions) => {
  try {
    await axios.post("https://entertainment-api-production.up.railway.app/api/password/send-link", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendInstructions;
