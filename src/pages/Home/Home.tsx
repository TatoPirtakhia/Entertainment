import { useEffect, useState } from "react";
import { GetAllMovies, MovieItem, TrendingMovieItem } from ".";
import { Shearch } from "../..";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
      filteredFilms = [];
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
    <div className="flex flex-col items-center xl:items-start xl:ml-[160px]">
      <div className="flex gap-[4%] w-[90%] items-center md:mb-4 mt-[70px] md:mt-[130px] xl:mt-[65px]  ">
        <Shearch />
        <input
          onInput={input}
          type="text"
          className="outfit xl:h-10 caret-Red pl-1 bg-DarkBlue outline-none text-white text-[16px] w-[90%] md:text-[24px] xl:cursor-pointer xl:hover:border-b-[1px] xl:hover:border-[#5A698F]  "
          placeholder="Search for movies or TV series"
        />
      </div>
      {count === 0 && inpitValue !== "" ? (
        <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
          {`Found ${count} results for '${inpitValue}'`}
        </h1>
      ) : count > 0 ? (
        <div className="flex flex-wrap gap-4 w-[95%] justify-start ">
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
            {`Found ${count} results for '${inpitValue}'`}
          </h1>
          {newData.map((movie: any) => {
            return (
              <MovieItem
                movie={movie}
                windowWidth={windowWidth}
                key={movie.title}
              />
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
                data.map((movie: any) => {
                  return movie.isTrending ? (
                    <TrendingMovieItem
                      movie={movie}
                      windowWidth={windowWidth}
                      key={movie.title}
                    />
                  ) : (
                    ""
                  );
                })}
            </Slider>
          </div>
          <h1 className="outfit font-[300] text-white text-xl w-[90%] mt-6 md:text-[32px] ">
            Recommended for you
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-[30px] xd:gap-10 xl:w-full w-[95%] justify-start mt-6">
            {data.map((movie: any) => {
              return (
                !movie.isTrending && (
                  <MovieItem
                    movie={movie}
                    windowWidth={windowWidth}
                    key={movie.title}
                  />
                )
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
