import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import VerifiAccount from "./pages/Registration/VerifyAccount";

function App() {
  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<Navigate to="/registration" />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/VerifyAccount" element={<VerifiAccount />} />
      </Routes>
    </div>
  );
}

export default App;
