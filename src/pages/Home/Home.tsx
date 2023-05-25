import { useEffect, useState } from "react";
import { GetAllMovies } from ".";
import { Shearch } from "../..";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookMarkEmpty, CategoryMovie } from "../../assets";
function Home() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movies = await GetAllMovies();
      setData(movies);
    };
   

    fetchData();
  }, []);

  const settings: Settings = {
    dots: false,
    infinite: false,
    arrows: false,
    draggable: true,
    centerMode: false,
    swipeToSlide: true,
    variableWidth: true,
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex gap-[4%] w-[90%] items-center mt-[70px]  mb-6">
        <Shearch />
        <input
          type="text"
          className="outfit pl-1 bg-DarkBlue outline-none text-white text-[16px] w-[90%]"
          placeholder="Search for movies or TV series"

        />
      </div>
      <h1 className="outfit mb-4 font-[300] text-white text-[20px] w-[90%]">
        Trending
      </h1>
      <div className="w-full ">
        <Slider {...settings}>
          {data &&
            data.map((movie: any) =>
              movie.isTrending ? (
                <div
                  key={movie.title}
                  className="rounded-[8px] relative"
                  style={{ width: "240px" }}
                >
                  <div className="absolute top-2 left-[200px]  w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
                    <BookMarkEmpty />
                  </div>
                  <img
                    src={movie.thumbnail.trending.small}
                    alt="image"
                    className="w-full h-full object-cover rounded-[8px] z-0 "
                  />
                  <div
                    className="w-full h-[70px]  absolute bottom-0 z-1"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.75) 100%)",
                    }}
                  >
                    <ul className="flex gap-4 text-white outfit font-[300] text-[12px] opacity-75 absolute bottom-[39px] left-4 ">
                      <li>{movie.year}</li>
                      <li className="flex items-center gap-2">
                        <CategoryMovie />
                        {movie.category}
                      </li>
                      <li>{movie.rating}</li>
                    </ul>
                    <h1 className="absolute bottom-4 left-4 outfit text-white text-[15px] font-medium">
                      {movie.title}
                    </h1>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
        </Slider>
      </div>
      <h1 className="outfit font-[300] text-white text-xl w-[90%] mt-6 ">
        Recommended for you
      </h1>
      <div className="flex flex-wrap gap-4 w-[95%] justify-center mt-6">
        {data.map((movie: any) => {
          return !movie.isTrending ? (
            <div
              key={movie.title}
              className="rounded-[8px] relative w-[164px] h-[154px] flex flex-col mb-4"
            >
              <div className="absolute top-2 left-[124px] z-10 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
                <BookMarkEmpty />
              </div>
              <img
                src={movie.thumbnail.regular.small}
                alt="image"
                className="rounded-[8px] z-0 "
              />
              <div className="w-full h-[50px] flex flex-col gap-[4px] mt-2">
                <ul className="flex gap-4 text-white outfit font-[300] text-[12px] opacity-75   ">
                  <li>{movie.year}</li>
                  <li className="flex items-center gap-2">
                    <CategoryMovie />
                    {movie.category}
                  </li>
                  <li>{movie.rating}</li>
                </ul>
                <h1 className="  outfit text-white text-[14px] font-medium">
                  {movie.title}
                </h1>
              </div>
            </div>
          ) : (
            ""
          );
        })}
      </div>
    </div>
  );
}

export default Home;
