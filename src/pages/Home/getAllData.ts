import axios from "axios";

const GetAllMovies = async () => {
  try {
    const response = await axios.get(
      "https://entertainment-api-production.up.railway.app/api/Home"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetAllMovies;
