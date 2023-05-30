import { useState } from "react";
import { BookMarkFull, CategoryMovie, CategoryTv, Play } from "../..";
import { MovieObj } from "../../types";

function BookmarkedMovies(props: {
  movie: MovieObj;
  windowWidth: number;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  setBookmarkClick: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkClick: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isHoveredMovies, setIsHoveredMovies] = useState(false);

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
    props.setBookmarkClick(!props.bookmarkClick);
  };

  return (
    <div
      onMouseEnter={handleMouseEnterMovies}
      onMouseLeave={handleMouseLeaveMovies}
      key={props.movie.title}
      className="rounded-[8px] cursor-pointer relative w-[164px] h-[154px] md:w-[220px] md:h-[192px] xl:w-[280px] xl:h-[226px] flex flex-col items-center mb-4"
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={props.movie.title}
        onClick={onClick}
        className="absolute cursor-pointer xl:hover:bg-white top-2 left-[124px] md:left-[172px] md:top-4 xl:left-[232px] z-20 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center "
      >
          {props.windowWidth >= 1440? <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
              stroke={isHovered ? "#000" : "#FFF"}
              strokeWidth="1.5"
              fill={!isClicked ? "#FFF" : "none"}
            />
          </svg>:<BookMarkFull/>}
      </div>
      <img
        src={
          props.windowWidth >= 1440
            ? props.movie.thumbnail.regular.large
            : props.windowWidth >= 768
            ? props.movie.thumbnail.regular.medium
            : props.movie.thumbnail.regular.small
        }
        alt="image"
        className="rounded-[8px] z-0 "
      />
      <div
        className={`xl:w-[280px] xl:h-[174px] xl:absolute xl:z-10 flex items-center justify-center ${
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
      <div className="w-full h-[50px] flex flex-col gap-[4px] mt-2">
        <ul className="flex gap-4 text-white outfit font-[300] text-[12px] md:text-[14px] opacity-75   ">
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
        <h1 className="outfit text-white text-[14px] md:text-[19px] font-medium">
          {props.movie.title}
        </h1>
      </div>
    </div>
  );
}

export default BookmarkedMovies;
