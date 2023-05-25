import { useEffect, useState } from "react";
import { BookMarkEmpty, CategoryMovie,  Shearch } from "../..";
import { getTvSeries } from ".";

function TvSeries() {

  const [tvSeries, setTvSeries] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTvSeries();
      setTvSeries(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-[4%] w-[90%] items-center mt-[70px] mb-6">
        <Shearch />
        <input
          type="text"
          className="outfit pl-1 bg-DarkBlue outline-none text-white text-[16px]"
          placeholder="Search for TV series"
        />
      </div>
      <h1 className="outfit  font-[300] text-white text-[20px] w-[90%]">TV Series</h1>
      <div className="flex flex-wrap gap-4 w-[95%] justify-center mt-6">
        {tvSeries.map((movie: any) => {
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
export default TvSeries;
