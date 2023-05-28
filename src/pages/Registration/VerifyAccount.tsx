import { useEffect } from "react";
import Checked from "../../assets/Checked";
import VerifyEmail from "./RequestForVerify";
import { useNavigate } from "react-router-dom";

function VerifiAccount() {
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.href;
    const parsedUrl = new URL(url);
    const hashValue = parsedUrl.searchParams.get("hash");

    if (hashValue) {
      VerifyEmail(hashValue);
    }
  }, []);
  return (
    <div className="flex items-center justify-center pt-[80px]">
      <div className=" w-[87%] md:w-[400px] bg-SemiDarkBlue pt-[77px] rounded-[10px] flex flex-col items-center">
        <Checked />
        <h1 className="outfit text-white text-[32px] mt-6 mb-6">Thank you!</h1>
        <p className="outfit text-white text-[16px] mb-6">
          Your account has been activated.
        </p>
        <div className="mb-[100px] flex- flex-col items-center">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-[#E31221] h-[38px] w-[190px] rounded-[10px] text-white outfit xl:hover:cursor-pointer xl:hover:bg-white xl:hover:text-DarkBlue  "
          >
            Login
          </button>
          <h1 className="outfit text-medium text-[25px] text-white text-center">
            OR
          </h1>
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="bg-[#E31221] h-[38px] w-[190px] rounded-[10px] text-white outfit xl:hover:cursor-pointer xl:hover:bg-white xl:hover:text-DarkBlue"
          >
            Go to home page{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifiAccount;
