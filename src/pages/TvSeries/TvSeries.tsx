import { useEffect, useState } from "react";
import { BookMarkEmpty, CategoryTv, Shearch } from "../..";
import { getTvSeries } from ".";

function TvSeries() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [tvSeries, setTvSeries] = useState<any>([]);
  const [count, setCount] = useState<number>(0);
  const [newData, setNewData] = useState<any>([]);
  const [inpitValue, setInputValue] = useState<string>("");

  const input = (event: any) => {
    const inputString = event.target.value;
    setInputValue(inputString);
    const inputLowerCase = inputString.toLowerCase();
    let filteredFilms = tvSeries.filter((film: any) =>
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
      const data = await getTvSeries();
      setTvSeries(data);
    };

    fetchData();
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[4%] w-[90%] items-center mt-[70px] md:mt-[130px] mb-6">
        <Shearch />
        <input
          onInput={input}
          type="text"
          className="outfit pl-1 bg-DarkBlue outline-none text-white text-[16px] md:text-[24px] w-[95%] "
          placeholder="Search for TV series"
        />
      </div>
      {count > 0 ? (
        <div className="flex flex-wrap  gap-4 md:gap-8 w-[95%] justify-start ">
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[90%] z-20">
            {`Found ${count} results for '${inpitValue}'`}
          </h1>
          {newData.map((movie: any) => {
            return (
              <div
                key={movie.title}
                className="rounded-[8px] relative w-[164px] h-[154px] md:w-[220px] md:h-[192px] flex flex-col mb-4"
              >
                <div className="absolute top-2 left-[124px] md:top-4 md:left-[172px] z-10 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
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
                      <CategoryTv />
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
          <h1 className="outfit  font-[300] text-white text-[20px] md:text-[32px] w-[90%]">
            TV Series
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-8 w-[95%] justify-start mt-6">
            {tvSeries.map((movie: any) => {
              return !movie.isTrending ? (
                <div
                  key={movie.title}
                  className="rounded-[8px] relative w-[164px] h-[154px] md:w-[220px] md:h-[192px] flex flex-col mb-4"
                >
                  <div className="absolute top-2 left-[124px] md:top-4 md:left-[172px] z-10 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center ">
                    <BookMarkEmpty  />
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
                        <CategoryTv />
                        {movie.category}
                      </li>
                      <li>{movie.rating}</li>
                    </ul>
                    <h1 className="  outfit text-white text-[14px] md:text-[19px] font-medium">
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
export default TvSeries;
