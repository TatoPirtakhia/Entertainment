import axios from "axios";

const setBookmark = async (data: any) => {
  
  try {
    const response = await axios.post(
      "https://movies-doxx.onrender.com/api/BookMark",
      {
        title: data.clickedSvg,
        name: data.name,
      },
      {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default setBookmark;
