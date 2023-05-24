import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form"
import { Obj, login } from "../../types";
import ValidationSchema from "./validations/validation";
import { useNavigate } from "react-router-dom";
import { LoginWithEmail, isEmail } from "./LoginNameOrEmail/LoginWithEmail";
import LoginWithName from "./LoginNameOrEmail/LoginWithName";
import { useState } from "react";
import { Logo } from "../../assets";
function Login(props:{
  setUser: React.Dispatch<React.SetStateAction<Obj>>
}) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({
    resolver: yupResolver(ValidationSchema),
  });
  const goToRegistration = () => {
    navigate("/registration");
  };
  const onSubmit: SubmitHandler<login> = async (data) => {
    if (isEmail(data.nameOrEmail)) {
      try {
        const token = await LoginWithEmail(data);
        const url = `/home?token=${encodeURIComponent(token.token)}`
        props.setUser(token.user)
        navigate(url)
      } catch (error) {
        setErrorMessage((error as { message: string }).message);
      }
    }else {
      try {
        const token = await LoginWithName(data);
        const url = `/home?token=${encodeURIComponent(token.token)}`
        props.setUser(token.user)
        navigate(url)
      } catch (error) {
        setErrorMessage((error as { message: string }).message);
      }
    }
  };
  const ButtonClick = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <div className="w-full flex flex-col items-center pt-12">
      <Logo />

      <div className="mt-[60px] w-[87%] bg-SemiDarkBlue  pt-6 pl-6 rounded-[10px] ">
        <h1 className="outfit font-[300] text-white text-[32px]">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-1">
          <div className="relative">
            <input
              {...register("nameOrEmail", { required: true })}
              type="text"
              placeholder="Name or Email"
              className={`w-[90%]  mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px] ${
                errors && errors.nameOrEmail ? "border-Red" : "border-[#5A698F]"
              }   `}
            />
            {errors.nameOrEmail && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6">
                {errors.nameOrEmail.message}
              </span>
            )}
            <p className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
              {errorMessage === "" ? "" : errorMessage}
            </p>
          </div>
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type="text"
              placeholder="Password"
              className={`w-[90%]  bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px] ${
                errors && errors.password
                  ? "pb-[67px] border-Red"
                  : "border-[#5A698F]"
              }`}
            />
            {errors.password && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
                {errors.password.message}
              </span>
            )}
          </div>
        </form>
        <p className="outfit text-blue-600 mb-5 font-[300]" onClick={()=>{navigate('/ForgotPassword')}}>Forgot password?</p>
        <button
          onClick={ButtonClick}
          className="w-[90%] mb-6 h-12 bg-Red rounded-[6px] outfit text-white font-[300] text-[15px] "
        >
          Login to your account
        </button>
        <p className="w-[90%] text-center text-white outfit text-[15px] font-[300] mb-6">
          Don't have an account?{" "}
          <span className="text-Red ml-2  " onClick={goToRegistration}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
