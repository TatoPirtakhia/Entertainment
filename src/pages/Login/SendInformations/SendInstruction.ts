import axios from "axios";

const SendInstructions = async (data: any) => {
  try {
    await axios.post("http://localhost:3005/api/password/send-link", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendInstructions;
