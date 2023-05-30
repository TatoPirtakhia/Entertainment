import axios from "axios";

const setBookmark = async (data: any) => {
  const url = window.location.href;
  const parsedUrl = new URL(url);
  const token = parsedUrl.searchParams.get("token");  
  try {
    const response = await axios.post(
      "https://movies-doxx.onrender.com/api/BookMark",
      { 
         title: data.clickedSvg,
         name: data.name ,
         
        },{
          headers:{
            authorization: `token ${token}`
          }
        }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default setBookmark;
