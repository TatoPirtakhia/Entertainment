import { useEffect, useState } from "react";
import { GetAllMovies } from ".";
import { Shearch } from "../..";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BookMarkEmpty, CategoryMovie, CategoryTv } from "../../assets";
function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState<any>([]);
  const [originlData, setOriginalData] = useState<any>([]);
  const [count, setCount] = useState<number>(0);
  const [newData, setNewData] = useState<any>([]);
  const [inpitValue, setInputValue] = useState<string>("");

  const input = (event: any) => {
    const inputString = event.target.value;
    setInputValue(inputString);
    const inputLowerCase = inputString.toLowerCase();
    let filteredFilms = originlData.filter((film: any) =>
      film.title.toLowerCase().includes(inputLowerCase.toLowerCase())
    );
    if (event.target.value === "") {
      filteredFilms = "";
    }
    setNewData(filteredFilms);
    setCount(filteredFilms.length);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    const fetchData = async () => {
      const movies = await GetAllMovies();
      setData(movies);
      setOriginalData(movies);
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
      <div className="flex gap-[4%] w-[90%] items-center md:mb-4 mt-[70px] md:mt-[130px]">
        <Shearch />
        <input
          onInput={input}
          type="text"
          className="outfit pl-1 bg-DarkBlue outline-none text-white text-[16px] w-[90%] md:text-[24px]  "
          placeholder="Search for movies or TV series"
        />
      </div>
      {count > 0 ? (
        <div className="flex flex-wrap gap-4 w-[95%] justify-start ">
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
            {`Found ${count} results for '${inpitValue}'`}
          </h1>
          {newData.map((movie: any) => {
            return (
              <div
                key={movie.title}
                className="rounded-[8px] relative w-[164px] h-[154px] md:w-[220px] md:h-[192px] flex flex-col mb-4"
              >
                <div className="absolute top-2 left-[124px] md:left-[172px] md:top-4 z-10 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
                  <BookMarkEmpty />
                </div>
                <img
                  src={
                    windowWidth >= 768
                      ? movie.thumbnail.regular.medium
                      : movie.thumbnail.regular.small
                  }
                  alt="image"
                  className="rounded-[8px] z-0 "
                />
                <div className="w-full h-[50px] flex flex-col gap-[4px] mt-2">
                  <ul className="flex gap-4 text-white outfit font-[300] text-[12px] md:text-[15px] opacity-75   ">
                    <li>{movie.year}</li>
                    <li className="flex items-center gap-2">
                      {movie.category === "Movie" ? (
                        <CategoryMovie />
                      ) : (
                        <CategoryTv />
                      )}

                      {movie.category}
                    </li>
                    <li>{movie.rating}</li>
                  </ul>
                  <h1 className="  outfit text-white text-[14px] md:text-[19px] font-medium">
                    {movie.title}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] w-[90%] md:text-[32px]">
            Trending
          </h1>
          <div className="w-full ">
            <Slider {...settings}>
              {data &&
                data.map((movie: any) =>
                  movie.isTrending ? (
                    <div
                      key={movie.title}
                      className="rounded-[8px] relative h-[140px] md:h-[230px]"
                      style={{ width: windowWidth >= 768 ? "470px" : "240px" }}
                    >
                      <div className="absolute top-2 left-[200px] md:top-4 md:left-[414px] w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
                        <BookMarkEmpty />
                      </div>
                      <img
                        src={
                          windowWidth >= 768
                            ? movie.thumbnail.trending.large
                            : movie.thumbnail.trending.small
                        }
                        alt="image"
                        className="w-full h-full object-cover rounded-[8px] z-0 "
                      />
                      <div
                        className="w-full h-[70px] md:h-[100px] absolute bottom-0 z-1"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.75) 100%)",
                        }}
                      >
                        <ul className="flex gap-4 text-white outfit font-[300] text-[12px]  md:text-[15px] opacity-75 absolute bottom-[39px] md:bottom-[55px] left-4 md:left-6 ">
                          <li>{movie.year}</li>
                          <li className="flex items-center gap-2">
                            {movie.category === "Movie" ? (
                              <CategoryMovie />
                            ) : (
                              <CategoryTv />
                            )}
                            {movie.category}
                          </li>
                          <li>{movie.rating}</li>
                        </ul>
                        <h1 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 outfit text-white text-[15px] md:text-[24px] font-medium">
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
          <h1 className="outfit font-[300] text-white text-xl w-[90%] mt-6 md:text-[32px] ">
            Recommended for you
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-[30px] w-[95%] justify-center mt-6">
            {data.map((movie: any) => {
              return !movie.isTrending ? (
                <div
                  key={movie.title}
                  className="rounded-[8px] relative w-[164px] h-[154px] md:w-[220px] md:h-[192px] flex flex-col mb-4"
                >
                  <div className="absolute top-2 left-[124px] md:left-[172px] md:top-4 z-10 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
                    <BookMarkEmpty />
                  </div>
                  <img
                    src={
                      windowWidth >= 768
                        ? movie.thumbnail.regular.medium
                        : movie.thumbnail.regular.small
                    }
                    alt="image"
                    className="rounded-[8px] z-0 "
                  />
                  <div className="w-full h-[50px] flex flex-col gap-[4px] mt-2">
                    <ul className="flex gap-4 text-white outfit font-[300] text-[12px] md:text-[14px] opacity-75   ">
                      <li>{movie.year}</li>
                      <li className="flex items-center gap-2">
                        {movie.category === "Movie" ? (
                          <CategoryMovie />
                        ) : (
                          <CategoryTv />
                        )}
                        {movie.category}
                      </li>
                      <li>{movie.rating}</li>
                    </ul>
                    <h1 className="outfit text-white text-[14px] md:text-[19px] font-medium">
                      {movie.title}
                    </h1>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
