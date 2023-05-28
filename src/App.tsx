import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Registration, SendEmail, VerifiAccount } from "./pages/Registration";
import { ForgotPassword, Login, RecoveryPassword } from "./pages/Login";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import { Logo, Movies, NavBookmark, NavHome, NavMovies, NavTvSeries } from ".";
import { Obj } from "./types";
import { TvSeries } from "./pages/TvSeries";

function App() {
  const navigate = useNavigate();
  const [click, setClik] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(false);

  const [user, setUser] = useState<Obj>({
    name: "",
    email: "",
    avatar: "",
    verify: false,
    password: "",
  });
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    setPath(window.location.pathname);
    setClik(false);
    const url = window.location.href;
    const parsedUrl = new URL(url);
    const Token = parsedUrl.searchParams.get("token");

    if (Token) {
      setToken(true);
    }
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
  return (
    <div className="w-full h-full ">
      <nav
        className={`${
          path === "/home" || path === "/movies" || path === "/tvSeries"
            ? ""
            : "hidden"
        } 
        w-full h-[56px] md:w-[95%] md:h-[72px]  md:top-6 md:ml-[2.5%] bg-SemiDarkBlue flex items-center justify-around xl:justify-none xl:justify-start fixed z-20
        xl:flex-col  xl:h-[95%] xl:w-[96px] xl:ml-[2%] xl:pt-[35px]
        `}
      >
        <div
          onClick={() => {
            const url = window.location.href;
            const parsedUrl = new URL(url);
            const token = parsedUrl.searchParams.get("token");
            if (token !== null) {
              navigate(`/home?token=${encodeURIComponent(token)}`);
            } else {
              navigate("/home");
            }
          }}
        >
          <Logo />
        </div>
        <div className="flex w-[40%] justify-between md:justify-center md:gap-8 md:flex-row xl:flex-col xl:items-center xl:mt-[75px]">
          <div
            onMouseEnter={handleMouseEnterHome}
            onMouseLeave={handleMouseLeaveHome}
            onClick={() => {
              const url = window.location.href;
              const parsedUrl = new URL(url);
              const token = parsedUrl.searchParams.get("token");
              if (token !== null) {
                navigate(`/home?token=${encodeURIComponent(token)}`);
              } else {
                navigate("/home");
              }
            }}
          >
            <NavHome path={path} isHoveredHome={isHoveredHome} />
          </div>
          <div
            onMouseEnter={handleMouseEnterMovie}
            onMouseLeave={handleMouseLeaveMovie}
            onClick={() => {
              const url = window.location.href;
              const parsedUrl = new URL(url);
              const token = parsedUrl.searchParams.get("token");
              if (token !== null) {
                navigate(`/movies?token=${encodeURIComponent(token)}`);
              } else {
                navigate("/movies");
              }
            }}
          >
            <NavMovies path={path} isHoveredMovie={isHoveredMovie} />
          </div>
          <div
            onMouseEnter={handleMouseEnterTv}
            onMouseLeave={handleMouseLeaveTv}
            onClick={() => {
              const url = window.location.href;
              const parsedUrl = new URL(url);
              const token = parsedUrl.searchParams.get("token");
              if (token !== null) {
                navigate(`/tvSeries?token=${encodeURIComponent(token)}`);
              } else {
                navigate("/tvSeries");
              }
            }}
          >
            <NavTvSeries path={path} isHoveredTv={isHoveredTv} />
          </div>
          {!token ? (
            ""
          ) : (
            <div
            onMouseEnter={handleMouseEnterBook}
            onMouseLeave={handleMouseLeaveBook}
              onClick={() => {
                navigate("/");
              }}
            >
              <NavBookmark path={path}  isHoveredBookmark={isHoveredBookmark}/>
            </div>
          )}
        </div>
        {!token ? (
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
          <img
            src={user.avatar}
            alt=""
            className="w-6 h-6 md:h-[40px] md:w-[40px] rounded-[50%] xl:mt-[550px]"
            onClick={() => {
              setClik(!click);
            }}
          />
        )}
        <button
          onClick={() => {
            navigate("/home");
            setClik(!click);
            setToken(false);
          }}
          className={`absolute bg-gray-500 outfit w-[60px] h-6 top-[50px] right-2 md:right-12 md:top-[60px] ${
            click ? "" : "hidden"
          } `}
        >
          Log out
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/VerifyAccount" element={<VerifiAccount />} />
        <Route path="/succesfullyCreated" element={<SendEmail />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/RecoveryPassword" element={<RecoveryPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvSeries" element={<TvSeries />} />
      </Routes>
    </div>
  );
}

export default App;
