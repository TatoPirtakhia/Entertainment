import { Routes, Route, Navigate } from "react-router-dom";
import { Registration, SendEmail, VerifiAccount } from "./pages/Registration";
import { ForgotPassword, Login, RecoveryPassword } from "./pages/Login";
import Home from "./pages/Home/Home";
import { useState } from "react";


function App() {
  const [user,setUser] = useState<object>({})
  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login setUser={setUser}/>} />
        <Route path="/VerifyAccount" element={<VerifiAccount />} />
        <Route path="/succesfullyCreated" element={<SendEmail />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/RecoveryPassword" element={<RecoveryPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
