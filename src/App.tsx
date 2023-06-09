import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Registration, SendEmail, VerifiAccount } from "./pages/Registration";
import { ForgotPassword, Login, RecoveryPassword } from "./pages/Login";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Logo, Movies, NavBookmark, NavHome, NavMovies, NavTvSeries } from ".";
import { MovieObj, avatar } from "./types";
import { TvSeries } from "./pages/TvSeries";
import BookMarked from "./pages/BookMarked/Bookmarked";
import { GetAllMovies } from "./pages/Home";
import setBookmark from "./pages/BookMarked/makeitBookmarked";

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieObj[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [click, setClik] = useState<boolean>(false);
  const [example, setExample] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<avatar>({
    avatar: "",
    name: "",
    moviestitle: [],
    token: "",
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    const data = localStorage.getItem("USER");
    if (data) {
      setAvatar(JSON.parse(data));
    }
    setExample(true);
    const fetchData = async () => {
      const data = await GetAllMovies();
      setMovies(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (example) {
      localStorage.setItem("USER", JSON.stringify(avatar));
    }
  }, [avatar]);

  const [path, setPath] = useState<string>("");

  useEffect(() => {
    setPath(window.location.pathname);
    setClik(false);
  }, [window.location.pathname]);
  const [isHoveredHome, setIsHoveredHome] = useState(false);
  const [isHoveredMovie, setIsHoveredMovie] = useState(false);
  const [isHoveredTv, setIsHoveredTv] = useState(false);
  const [isHoveredBookmark, setIsHoveredBookmark] = useState(false);

  const handleMouseEnterHome = () => {
    setIsHoveredHome(true);
  };

  const handleMouseLeaveHome = () => {
    setIsHoveredHome(false);
  };

  const handleMouseEnterMovie = () => {
    setIsHoveredMovie(true);
  };

  const handleMouseLeaveMovie = () => {
    setIsHoveredMovie(false);
  };

  const handleMouseEnterTv = () => {
    setIsHoveredTv(true);
  };

  const handleMouseLeaveTv = () => {
    setIsHoveredTv(false);
  };
  const handleMouseEnterBook = () => {
    setIsHoveredBookmark(true);
  };

  const handleMouseLeaveBook = () => {
    setIsHoveredBookmark(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedSvg = event.currentTarget.id;
    const name = avatar.name;
    const token = avatar.token
    if (clickedSvg && name) {
      const movieIndex = avatar.moviestitle.indexOf(clickedSvg);

      if (movieIndex !== -1) {
        const updatedMoviestitle = [...avatar.moviestitle];
        updatedMoviestitle.splice(movieIndex, 1);
        setAvatar({ ...avatar, moviestitle: updatedMoviestitle });
      } else {
        setAvatar({
          ...avatar,
          moviestitle: [...avatar.moviestitle, clickedSvg],
        });
      }
      setBookmark({ clickedSvg, name ,token});
    }
  };

  return (
    <div className="w-full h-full ">
      <nav
        className={`${
          path === "/home" ||
          path === "/movies" ||
          path === "/tvSeries" ||
          path === "/bookmarked"
            ? ""
            : "hidden"
        } 
        w-full h-[56px] md:w-[95%] md:h-[72px]  md:top-6 md:ml-[2.5%] bg-SemiDarkBlue flex items-center justify-around xl:justify-none xl:justify-start fixed z-50
        xl:flex-col  xl:h-[95%] xl:w-[96px] xl:ml-[2%] xl:pt-[35px] xl:rounded-[20px]
        `}
      >
        <div
          onClick={() => {
            navigate("/home");
          }}
        >
          <Logo />
        </div>
        <div className="flex w-[40%] justify-between md:justify-center md:gap-8 md:flex-row xl:flex-col xl:items-center xl:mt-[75px]">
          <div
            onMouseEnter={handleMouseEnterHome}
            onMouseLeave={handleMouseLeaveHome}
            onClick={() => {
              navigate("/home");
            }}
          >
            <NavHome
              path={path}
              isHoveredHome={isHoveredHome}
              windowWidth={windowWidth}
            />
          </div>
          <div
            onMouseEnter={handleMouseEnterMovie}
            onMouseLeave={handleMouseLeaveMovie}
            onClick={() => {
              navigate("/movies");
            }}
          >
            <NavMovies
              path={path}
              isHoveredMovie={isHoveredMovie}
              windowWidth={windowWidth}
            />
          </div>
          <div
            onMouseEnter={handleMouseEnterTv}
            onMouseLeave={handleMouseLeaveTv}
            onClick={() => {
              navigate("/tvSeries");
            }}
          >
            <NavTvSeries
              path={path}
              isHoveredTv={isHoveredTv}
              windowWidth={windowWidth}
            />
          </div>
          {!avatar.token ? (
            ""
          ) : (
            <div
              onMouseEnter={handleMouseEnterBook}
              onMouseLeave={handleMouseLeaveBook}
              onClick={() => {
                navigate("/bookmarked");
              }}
            >
              <NavBookmark
                path={path}
                isHoveredBookmark={isHoveredBookmark}
                windowWidth={windowWidth}
              />
            </div>
          )}
        </div>
        {!avatar.token ? (
          <div className="xl:mt-[500px] flex  xl:flex-col xl:items-center ">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="outfit text-white font-medium text-[15px] md:text-[24px] opacity-70 xl:hover:text-Red"
            >
              Sign in
            </button>
            <p className="outfit text-white font-medium text-[15px] md:text-[24px]">
              /
            </p>
            <button
              onClick={() => {
                navigate("/registration");
              }}
              className="outfit text-white font-medium text-[15px] md:text-[24px] opacity-70 xl:hover:text-Red"
            >
              Sign up
            </button>
          </div>
        ) : (
          <div className="relative w-[40px] xl:mt-[550px]">
            <img
              src={avatar.avatar}
              alt=""
              className="w-6 h-6 md:h-[40px] md:w-[40px] rounded-[50%] "
              onClick={() => {
                setClik(!click);
              }}
            />
            <button
              onClick={() => {
                setClik(!click);
                setAvatar({ avatar: "", name: "", moviestitle: [], token: "" });
                navigate("/home");
                
              }}
              className={`absolute bg-gray-500 outfit w-[60px] h-6 top-[30px] right-1 md:right-0 md:top-[50px] xl:top-[-40px] xl:left-[-7px] xl:hover:text-Red ${
                click ? "" : "hidden"
              } `}
            >
              Log out
            </button>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/login"
          element={<Login setAvatar={setAvatar} avatar={avatar} />}
        />
        <Route path="/VerifyAccount" element={<VerifiAccount />} />
        <Route path="/succesfullyCreated" element={<SendEmail />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/RecoveryPassword" element={<RecoveryPassword />} />
        <Route path="/home" element={<Home handleClick={handleClick} avatar={avatar} />} />
        <Route path="/movies" element={<Movies handleClick={handleClick} avatar={avatar}/>} />
        <Route
          path="/tvSeries"
          element={<TvSeries handleClick={handleClick} avatar={avatar}/>}
        />
        <Route
          path="/bookmarked"
          element={
            <BookMarked
              avatar={avatar}
              movies={movies}
              handleClick={handleClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
