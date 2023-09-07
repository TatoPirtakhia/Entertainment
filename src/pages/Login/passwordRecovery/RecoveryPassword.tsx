import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../../assets/Logo";
import { Recovery } from "../../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordSchema from "../validations/PasswordValidation";
import { useEffect, useState } from "react";
import SendRecoveryPassword from "../SendInformations/SendRecoveryData";
import { useNavigate } from "react-router-dom";

function RecoveryPassword() {
  const navigate = useNavigate();
  const [hashvalue, sethashvalue] = useState<string>("");
  useEffect(() => {
    const url = window.location.href;
    const parsedUrl = new URL(url);
    const hashValue = parsedUrl.searchParams.get("hash");

    if (hashValue) {
      sethashvalue(hashValue);
    }
  }, []);
  const onSubmit: SubmitHandler<Recovery> = async (data) => {
    
    await SendRecoveryPassword({
        password:data.password,
        repeatPassword:data.repeatPassword,
        hash:hashvalue
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Recovery>({
    resolver: yupResolver(PasswordSchema),
  });
  const ButtonClick = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <div className="w-full flex flex-col items-center pt-12">
      <Logo />

      <div className="mt-[60px] w-[87%] md:w-[400px] bg-SemiDarkBlue  flex flex-col items-center pt-5 rounded-[10px] ">
        <h1 className="outfit font-[300] text-white text-[32px]">
          Create new password
        </h1>
        <p className="w-[90%] outfit text-center text-[14px] text-[#6C757D] mb-6  ">
          Your new password must be different from previous used passwords
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full pl-6 mt-8 mb-1"
        >
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type="text"
              placeholder="Password"
              className={`w-[90%]  mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px] ${
                errors && errors.password ? "border-Red" : "border-[#5A698F]"
              }   `}
            />
            {errors.password && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              {...register("repeatPassword", { required: true })}
              type="text"
              placeholder="Confirm password"
              className={`w-[90%]  mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px] ${
                errors && errors.repeatPassword
                  ? "border-Red"
                  : "border-[#5A698F]"
              }   `}
            />
            {errors.repeatPassword && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6">
                {errors.repeatPassword.message}
              </span>
            )}
          </div>
        </form>
        <button
          onClick={ButtonClick}
          className="w-[90%] mb-6 h-12 bg-Red rounded-[6px] outfit text-white font-[300] text-[15px] "
        >
          Reset password
        </button>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="outfit text-[#6C757D] mb-5"
        >
          Back to log in
        </p>
      </div>
    </div>
  );
}

export default RecoveryPassword;
