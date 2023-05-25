import axios from "axios";

const GetMovies = async () => {
  try {
    const response = await axios.get("https://movies-doxx.onrender.com/api/Movies");
    console.log(response.data)
    return response.data
  
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetMovies;