import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../../assets/Logo";
import { forgotPassword } from "../../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailValidation from "../validations/EmailValidation";
import SendInstructions from "../SendInformations/SendInstruction";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<forgotPassword> = async (data) => {
    await SendInstructions({
      email: data.email,
      redirectLink: "https://entertainment-omega.vercel.app/RecoveryPassword",
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPassword>({
    resolver: yupResolver(EmailValidation),
  });
  const ButtonClick = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <div className="w-full flex flex-col items-center pt-12">
      <Logo />

      <div className="mt-[60px] w-[87%] md:w-[400px] bg-SemiDarkBlue  flex flex-col items-center pt-5 rounded-[10px] ">
        <h1 className="outfit font-[300] text-white text-[32px]">
          Forgot Password?
        </h1>
        <p className="outfit text-center w-[90%]  text-[14px] text-[#6C757D] mb-6 border-b-[1px] border-[#5A698F] ">
          Enter the email and we'll send an email with instructions to reset
          your password
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full pl-5 mt-8 mb-1"
        >
          <div className="relative">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className={`w-[90%]  mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px] ${
                errors && errors.email ? "border-Red" : "border-[#5A698F]"
              }   `}
            />
            {errors.email && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6">
                {errors.email.message}
              </span>
            )}
          </div>
        </form>
        <button
          onClick={ButtonClick}
          className="w-[90%] mb-6 h-12 bg-Red rounded-[6px] outfit text-white font-[300] text-[15px] "
        >
          Send instructions
        </button>
        <p onClick={()=>{navigate('/login')}} className="outfit text-[#6C757D] mb-5">Back to log in</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
