import axios from "axios";
import { SendInstructions } from "../../../types";

const SendInstructions = async (data: SendInstructions) => {
  try {
    await axios.post("https://movies-doxx.onrender.com/api/password/send-link", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendInstructions;
