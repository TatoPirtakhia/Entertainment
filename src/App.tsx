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
  const [click,setClik] = useState<boolean>(false)
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
    setClik(false)
  }, [window.location.pathname]);

  return (
    <div className="w-full h-full ">
      <nav
        className={`${
          path === "/home" || path === "/movies" || path === "/tvSeries"
            ? ""
            : "hidden"
        } 
        w-full h-[56px] bg-SemiDarkBlue flex items-center justify-around relative
      `}
      >
        <Logo />
        <div className="flex w-[40%] justify-between ">
          <div
            onClick={() => {
              navigate("/home");
            }}
          >
            <NavHome path={path} />
          </div>
          <div
            onClick={() => {
              navigate("/movies");
            }}
          >
            <NavMovies path={path} />
          </div>
          <div
            onClick={() => {
              navigate("/tvSeries");
            }}
          >
            <NavTvSeries path={path} />
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <NavBookmark path={path} />
          </div>
        </div>
        <img src={user.avatar} alt="" className="w-6 h-6 rounded-[50%]" onClick={()=>{setClik(!click)}} />
        <button onClick={()=>{navigate('/login')}} className={`absolute bg-gray-500 outfit w-[60px] h-6 top-[50px] right-2 ${click?'':'hidden'} `}>Log out</button>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/VerifyAccount" element={<VerifiAccount />} />
        <Route path="/succesfullyCreated" element={<SendEmail />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/RecoveryPassword" element={<RecoveryPassword />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/movies" element={<Movies user={user} />} />
        <Route path="/tvSeries" element={<TvSeries user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
