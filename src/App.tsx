import { Routes, Route, Navigate } from "react-router-dom";
import { Registration, SendEmail, VerifiAccount } from "./pages/Registration";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/passwordRecovery/ForgotPassword";
import RecoveryPassword from "./pages/Login/passwordRecovery/RecoveryPassword";

function App() {
  return (
    <div className="w-full h-full ">
      <Routes>
        <Route path="/" element={<Navigate to="/registration" />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/VerifyAccount" element={<VerifiAccount />} />
        <Route path="/succesfullyCreated" element={<SendEmail />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/RecoveryPassword" element={<RecoveryPassword />} />

        x
      </Routes>
    </div>
  );
}

export default App;
