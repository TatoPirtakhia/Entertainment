import { useEffect } from "react";
import Checked from "../../assets/Vector";
import VerifyEmail from "./RequestForVerify";

function VerifiAccount() {
    useEffect(() => {
        const url = window.location.href;
        const parsedUrl = new URL(url);
        const hashValue = parsedUrl.searchParams.get("hash");
    
        if (hashValue) {
            VerifyEmail(hashValue)
        }
      }, []);
  return (
    <div className="flex items-center justify-center pt-[80px]">
      <div className=" w-[87%] bg-SemiDarkBlue pt-[77px] rounded-[10px] flex flex-col items-center">
        <Checked />
        <h1 className="outfit text-white text-[32px] mt-6 mb-6">Thank you!</h1>
        <p className="outfit text-white text-[16px] mb-6">Your account has been activated.</p>
        <button className="bg-[#E31221] h-[38px] w-[190px] rounded-[10px] text-white outfit mb-[100px] ">Go to news feed </button>
      </div>
    </div>
  );
}

export default VerifiAccount;
