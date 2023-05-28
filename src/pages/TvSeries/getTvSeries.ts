import axios from "axios";

const getTvSeries = async () => {
  try {
    const response = await axios.get("https://movies-doxx.onrender.com/api/TvSeries");
    return response.data
  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default getTvSeries;