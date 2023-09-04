import { useEffect, useState } from "react";
import { MovieObj, avatar } from "../../types";
import BookmarkedMovies from "./bookmarkedmovies";
import Search from "../../assets/Shearch";

function BookMarked(props: {
  avatar: avatar;
  movies: MovieObj[];
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [count, setCount] = useState<number>(0);
  const [newData, setNewData] = useState<MovieObj[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [bookMovies, setBookMovies] = useState<MovieObj[]>([]);

  const [bookmarkClick, setBookmarkClick] = useState<boolean>(false);

  const input = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);
    const inputLowerCase = inputString.toLowerCase();
    let filteredFilms = bookMovies.filter((film: MovieObj) =>
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

    const filteredMovies = props.movies.filter((movie: MovieObj) =>
      props.avatar.moviestitle.includes(movie.title)
    );
    setBookMovies(filteredMovies);
  }, [bookmarkClick]);

  return (
    <div className="flex flex-col items-center xl:items-start xl:ml-[160px] ">
      <div className="flex gap-[4%] w-[90%] items-center mt-[70px] md:mt-[130px] xl:mt-[65px] mb-6">
        <Search/>
        <input
          onInput={input}
          type="text"
          className="outfit xl:h-10 caret-Red pl-1 bg-DarkBlue outline-none text-white text-[16px] w-[90%] md:text-[24px] xl:cursor-pointer xl:hover:border-b-[1px] xl:hover:border-[#5A698F]  "
          placeholder="Search for bookmarked shows"
        />
      </div>
      {count === 0 && inputValue !== "" ? (
        <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
          {`Found ${count} results for '${inputValue}'`}
        </h1>
      ) : count > 0 && inputValue !== "" ? (
        <div className="flex flex-wrap  gap-4 md:gap-8 w-[95%] xl:w-full justify-start ">
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[90%] z-20">
            {`Found ${count} results for '${inputValue}'`}
          </h1>
          {newData.map((movie: MovieObj) => {
            return (
              <BookmarkedMovies
                movie={movie}
                windowWidth={windowWidth}
                key={movie.title}
                handleClick={props.handleClick}
                setBookmarkClick={setBookmarkClick}
                bookmarkClick={bookmarkClick}
              />
            );
          })}
        </div>
      ) : (
        <>
          <h1 className="outfit  font-[300] text-white text-[20px] w-[90%] md:text-[32px]">
            Bookmarked Movies
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-8 w-[95%] xl:w-full justify-center xl:justify-start mt-6">
            {bookMovies.map((movie: MovieObj) => {
              return (
                movie.category === "Movie" && (
                  <BookmarkedMovies
                    movie={movie}
                    windowWidth={windowWidth}
                    key={movie.title}
                    handleClick={props.handleClick}
                    setBookmarkClick={setBookmarkClick}
                    bookmarkClick={bookmarkClick}
                  />
                )
              );
            })}
          </div>
          <h1 className="outfit  font-[300] text-white text-[20px] w-[90%] md:text-[32px] xl:mt-10">
            Bookmarked TV Series
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-8 w-[95%] xl:w-full justify-center xl:justify-start mt-6">
            {bookMovies.map((movie: MovieObj) => {
              return (
                movie.category === "TV Series" && (
                  <BookmarkedMovies
                    movie={movie}
                    windowWidth={windowWidth}
                    key={movie.title}
                    handleClick={props.handleClick}
                    setBookmarkClick={setBookmarkClick}
                    bookmarkClick={bookmarkClick}
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
export default BookMarked;
