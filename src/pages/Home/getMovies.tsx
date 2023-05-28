import { useState } from "react";
import { CategoryMovie, CategoryTv, Play } from "../..";

function MovieItem(props: { movie: any; windowWidth: number }) {
    const [isHovered, setIsHovered] = useState(false);
  
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
  
    return (
      <div
        onMouseEnter={handleMouseEnterMovies}
        onMouseLeave={handleMouseLeaveMovies}
        key={props.movie.title}
        className="rounded-[8px] cursor-pointer relative w-[164px] h-[154px] md:w-[220px] md:h-[192px] xl:w-[280px] xl:h-[226px] flex flex-col mb-4"
      >
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          id={props.movie.title}
          className="absolute cursor-pointer xl:hover:bg-white top-2 left-[124px] md:left-[172px] md:top-4 xl:left-[232px] z-20 w-8 h-8 bg bg-DarkBlue bg-opacity-50 rounded-[50%] flex justify-center items-center "
        >
          <svg width="12"  height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke={isHovered ? "#000" : "#FFF"}
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
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

  export default MovieItem