import { useEffect, useState } from "react";
import { CategoryMovie, CategoryTv, Play } from "../..";
import { MovieObj } from "../../types";

function TrendingMovieItem(props: {
  movie: MovieObj;
  windowWidth: number;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredMovies, setIsHoveredMovies] = useState(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnterMovies = () => {
    setIsHoveredMovies(true);
  };

  const handleMouseLeaveMovies = () => {
    setIsHoveredMovies(false);
  };
  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    props.handleClick(event);
    setIsClicked(!isClicked);
  };
  useEffect(() => {
    const url = window.location.href;
    const parsedUrl = new URL(url);
    const Token = parsedUrl.searchParams.get("token");
    if (Token) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, [window.location.href]);

  return (
    <div
      onMouseEnter={handleMouseEnterMovies}
      onMouseLeave={handleMouseLeaveMovies}
      key={props.movie.title}
      className="rounded-[8px] relative cursor-pointer h-[140px] md:h-[230px] mr-5"
      style={{ width: props.windowWidth >= 768 ? "470px" : "240px" }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={props.movie.title}
        onClick={onClick}
        className="absolute top-2 xl:hover:bg-white cursor-pointer left-[200px] md:top-4 md:left-[414px] w-8 
          h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center z-20"
      >
        {props.movie.isBookmarked && token ? (
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
              stroke={isHovered ? "#000" : "#FFF"}
              strokeWidth="1.5"
              fill={!isClicked ? "#FFF" : "none"}
            />
          </svg>
        ) : (
          <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke={isHovered ? "#000" : "#FFF"}
              strokeWidth="1.5"
              fill={isClicked ? "#FFF" : "none"}
            />
          </svg>
        )}
      </div>
      <img
        src={
          props.windowWidth >= 768
            ? props.movie.thumbnail.trending.large
            : props.movie.thumbnail.trending.small
        }
        alt="image"
        className="w-full h-full object-cover rounded-[8px] z-0"
      />
      <div
        className={`xl:w-[480px] xl:h-[230px] xl:absolute xl:z-90 flex items-center justify-center ${
          !isHoveredMovies ? "hidden" : ""
        } `}
        style={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
        }}
      >
        <div className="w-[117px] h-[48px] bg-white  bg-opacity-50 rounded-[28px] pl-[9px] flex gap-5 items-center ">
          <Play />
          <p className="outfit font-medium text-white text-[18px]">Play</p>
        </div>
      </div>

      <div
        className="w-full h-[70px] md:h-[100px] absolute bottom-0 z-30"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.75) 100%)",
        }}
      >
        <ul className="flex gap-4 text-white outfit font-[300] text-[12px]  md:text-[15px] opacity-75 absolute bottom-[39px] md:bottom-[55px] left-4 md:left-6 ">
          <li>{props.movie.year}</li>
          <li className="flex items-center gap-2">
            {props.movie.category === "Movie" ? (
              <CategoryMovie />
            ) : (
              <CategoryTv />
            )}
            {props.movie.category}
          </li>
          <li>{props.movie.rating}</li>
        </ul>
        <h1 className="absolute bottom-4 md:bottom-6 left-4 md:left-6 outfit text-white text-[15px] md:text-[24px] font-medium">
          {props.movie.title}
        </h1>
      </div>
    </div>
  );
}

export default TrendingMovieItem;
