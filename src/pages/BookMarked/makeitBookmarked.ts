import axios from "axios";
import { BokkmarkSend } from "../../types";

const setBookmark = async (data: BokkmarkSend) => {
  
  try {
    const response = await axios.post(
      "https://entertainment-api-production.up.railway.app/api/BookMark",
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
