import axios from "axios";

const SendInstructions = async (data: any) => {
  try {
    await axios.post("https://movies-doxx.onrender.com/api/password/send-link", data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default SendInstructions;
