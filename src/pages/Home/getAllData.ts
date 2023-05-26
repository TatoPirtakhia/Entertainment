import axios from "axios";

const GetAllMovies = async () => {
  try {
    const response = await axios.get(
      "https://movies-doxx.onrender.com/api/Home"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetAllMovies;
