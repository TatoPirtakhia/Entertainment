import { useNavigate } from "react-router-dom";
import SendEmailicon from "../../assets/SendEmailicon";

function SendEmail() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center pt-[80px]">
      <div className=" w-[87%] bg-SemiDarkBlue pt-[77px] rounded-[10px] flex flex-col items-center">
        <SendEmailicon />
        <h1 className="outfit text-white text-[32px] mt-6 mb-6">Thank you!</h1>
        <p className="outfit text-center text-white text-[16px] mb-6">
          Please check your email and follow the instructions to activate your
          account.
        </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-[#E31221] h-[38px] w-[190px] rounded-[10px] text-white outfit mb-[100px] "
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default SendEmail;
