import { useEffect, useState } from "react";
import { GetAllMovies, MovieItem, TrendingMovieItem } from ".";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MovieObj, avatar } from "../../types";
import Search from "../../assets/Shearch";
import loginWithGoogle from "../Login/LoginNameOrEmail/loginWIthGoogle";
function Home(props: {
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  avatar: avatar;
  setAvatar: React.Dispatch<React.SetStateAction<avatar>>
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState<MovieObj[]>([]);
  const [originalData, setOriginalData] = useState<MovieObj[]>([]);
  const [count, setCount] = useState<number>(0);
  const [newData, setNewData] = useState<MovieObj[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const input = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);
    const inputLowerCase = inputString.toLowerCase();
    let filteredFilms = originalData.filter((film: MovieObj) =>
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
  const [movieNames, setMovieNames] = useState<avatar>({
    avatar: "",
    name: "",
    moviestitle: [],
    token: "",
  });

  useEffect(() => {
    const getUser = async (name: string) => {
      const user = await loginWithGoogle({ name: name });
        const img = user.user.avatar;
        const Username = user.user.name;
        const movies = user.user.movititle;
        const token = user.token;
        props.setAvatar({
          avatar: img,
          name:Username,
          moviestitle: movies,
          token: token,
        });
    };
    const url = window.location.href;
    const urlObject = new URL(url);
    const name = urlObject.searchParams.get("name");
    if (name) {
      name ? getUser(name):console.log('nope');
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("USER");
    if (data) {
      setMovieNames(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex flex-col items-center xl:items-start xl:ml-[160px]">
      <div className="flex gap-[4%] w-[90%] items-center md:mb-4 mt-[70px] md:mt-[130px] xl:mt-[65px]  ">
        <Search />
        <input
          onInput={input}
          type="text"
          className="outfit xl:h-10 caret-Red pl-1 bg-DarkBlue outline-none text-white text-[16px] w-[90%] md:text-[24px] xl:cursor-pointer xl:hover:border-b-[1px] xl:hover:border-[#5A698F]  "
          placeholder="Search for movies or TV series"
        />
      </div>
      {count === 0 && inputValue !== "" ? (
        <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
          {`Found ${count} results for '${inputValue}'`}
        </h1>
      ) : count > 0 ? (
        <div className="flex flex-wrap gap-4 w-full justify-center    xl:justify-start ">
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] md:text-[32px] w-[95%] z-20">
            {`Found ${count} results for '${inputValue}'`}
          </h1>
          {newData.map((movie: MovieObj) => {
            return (
              <MovieItem
                movie={movie}
                movieNames={movieNames}
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
          <h1 className="outfit mb-4 font-[300] text-white text-[20px] w-[90%] md:text-[32px]">
            Trending
          </h1>
          <div className="w-full ">
            <Slider {...settings}>
              {data &&
                data.map((movie: MovieObj) => {
                  return movie.isTrending ? (
                    <TrendingMovieItem
                      movie={movie}
                      movieNames={movieNames}
                      windowWidth={windowWidth}
                      handleClick={props.handleClick}
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
          <div className="flex flex-wrap gap-4 md:gap-10 xd:gap-10 xl:w-full w-[95%] justify-center   mt-6">
            {data.map((movie: MovieObj) => {
              return (
                !movie.isTrending && (
                  <MovieItem
                    movie={movie}
                    movieNames={movieNames}
                    handleClick={props.handleClick}
                    windowWidth={windowWidth}
                    key={movie.title}
                    avatar={props.avatar}
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
