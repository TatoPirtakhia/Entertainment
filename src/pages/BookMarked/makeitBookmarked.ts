import axios from "axios";

const setBookmark = async (data: any) => {
  console.log(data);
  try {
    const response = await axios.post(
      "https://movies-doxx.onrender.com/api/BookMark",
      { 
         title: data.clickedSvg,
         name: data.name 
        }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default setBookmark;
