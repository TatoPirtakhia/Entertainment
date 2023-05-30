import { useEffect, useState } from "react";
import { GetMovies, Shearch } from "../..";
import { MovieItem } from "../Home";
import { MovieObj, avatar } from "../../types";

function Movies(props: {
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  avatar: avatar;
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState<MovieObj[]>([]);
  const [count, setCount] = useState<number>(0);
  const [newData, setNewData] = useState<MovieObj[]>([]);
  const [inpitValue, setInputValue] = useState<string>("");

  const input = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);
    const inputLowerCase = inputString.toLowerCase();
    let filteredFilms = movies.filter((film: MovieObj) =>
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
      const data = await GetMovies();
      setMovies(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center xl:items-start xl:ml-[160px] ">
      <div className="flex gap-[4%] w-[90%] items-center mt-[70px] md:mt-[130px] xl:mt-[65px] mb-6">
        <Shearch />
        <input
          onInput={input}
          type="text"
          className="outfit xl:h-10 caret-Red pl-1 bg-DarkBlue outline-none text-white text-[16px] w-[90%] md:text-[24px] xl:cursor-pointer xl:hover:border-b-[1px] xl:hover:border-[#5A698F]  "
          placeholder="Search for movies"
        />
      </div>
      {count === 0 && inpitValue !== "" ? (
        <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
          {`Found ${count} results for '${inpitValue}'`}
        </h1>
      ) : count > 0 && inpitValue !== "" ? (
        <div className="flex flex-wrap  gap-4 md:gap-8 w-[95%] xl:w-full justify-start ">
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[90%] z-20">
            {`Found ${count} results for '${inpitValue}'`}
          </h1>
          {newData.map((movie: MovieObj) => {
            return (
              <MovieItem
                movie={movie}
                windowWidth={windowWidth}
                handleClick={props.handleClick}
                key={movie.title}
                avatar={props.avatar}
              />
            );
          })}
        </div>
      ) : (
        <>
          <h1 className="outfit  font-[300] text-white text-[20px] w-[90%] md:text-[32px]">
            Movies
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-8 w-[95%] xl:w-full justify-center xl:justify-start mt-6">
            {movies.map((movie: MovieObj) => {
              return (
                <MovieItem
                  movie={movie}
                  windowWidth={windowWidth}
                  handleClick={props.handleClick}
                  key={movie.title}
                  avatar={props.avatar}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
export default Movies;
