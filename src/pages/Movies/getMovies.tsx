import axios from "axios";

const GetMovies = async () => {
  try {
    const response = await axios.get(
      "https://entertainment-ld1a.onrender.com/api/Movies"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default GetMovies;
