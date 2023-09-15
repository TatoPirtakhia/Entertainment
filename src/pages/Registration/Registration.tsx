import Logo from "../../assets/Logo";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema from "./Validation";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { sendRegistrationRequest } from "./index";
function Registration() {
  const [selectedImage, setSelectedImage] = useState<boolean>(true);
  const [errorField, setErrorField] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(ValidationSchema),
  });
  const goToLoginPage = () => {
    navigate("/login");
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (imageRef.current && imageRef.current.files) {
      const formData = new FormData();
      formData.append("avatar", imageRef.current.files[0]);
      formData.append("name", data.name);
      formData.append(
        "redirectLink",
        "https://entertainment-omega.vercel.app/VerifyAccount"
      );
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("repeatPassword", data.repeatPassword);
      try {
        await sendRegistrationRequest(formData);
        navigate("/succesfullyCreated");
      } catch (error) {
        setErrorMessage((error as { message: string }).message);
        setErrorField((error as { field: string }).field);
      }
    }
  };
  const ButtonClick = () => {
    let file: any;
    if (imageRef.current && imageRef.current.files) {
      file = imageRef.current.files[0];
    }
    if (!file) {
      handleSubmit(onSubmit)();
      setSelectedImage(false);
    } else {
      handleSubmit(onSubmit)();
      setSelectedImage(true);
    }
  };
  return (
    <div className="w-full flex flex-col items-center pt-12 xl:pt-[80px]">
      <div
        onClick={() => {
          navigate("/home");
        }}
      >
        <Logo />
      </div>
      <div className="mt-[60px] xl:mt-[80px] w-[400px] bg-SemiDarkBlue  pt-6 pl-6 rounded-[10px] ">
        <h1 className="outfit font-[300] text-white text-[32px]">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-10">
          <div className="relative">
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className={`w-[90%] cursor-pointer xl:hover:border-white mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px] ${
                errors && errors.name ? " border-Red" : "border-[#5A698F]"
              }`}
            />
            {errors.name && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
                {errors.name.message}
              </span>
            )}
            <p className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
              {errorField === "name"
                ? errorMessage === ""
                  ? ""
                  : errorMessage
                : ""}
            </p>
          </div>
          <div className="relative">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email address"
              className={`w-[90%] cursor-pointer xl:hover:border-white mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px]  ${
                errors && errors.email ? " border-Red" : "border-[#5A698F]"
              }`}
            />
            {errors.email && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
                {errors.email.message}
              </span>
            )}
            <p className="outfit   text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
              {errorField === "email"
                ? errorMessage === ""
                  ? ""
                  : errorMessage
                : ""}
            </p>
          </div>
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type="text"
              placeholder="Password"
              className={`w-[90%] cursor-pointer xl:hover:border-white mb-6 bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px]  ${
                errors && errors.password ? " border-Red" : "border-[#5A698F]"
              }`}
            />
            {errors.password && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="relative">
            <input
              {...register("repeatPassword", { required: true })}
              type="text"
              placeholder="Repeat Password"
              className={`w-[90%] cursor-pointer xl:hover:border-white bg-SemiDarkBlue pl-4 outfit font-[300] text-[15px] text-white outline-none pb-5 border-b-[1px]  ${
                errors && errors.repeatPassword
                  ? " border-Red"
                  : "border-[#5A698F]"
              } `}
            />
            {errors.repeatPassword && (
              <span className="outfit  text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
                {errors.repeatPassword.message}
              </span>
            )}
          </div>
        </form>

        <div className="relative mb-6">
          <input
            type="file"
            ref={imageRef}
            name="avatar"
            className="text-white"
          />
          {selectedImage ? (
            ""
          ) : (
            <span className="outfit mt-1 text-Red text-[15px] absolute left-0 top-6 w-[90%] ">
              Image is required
            </span>
          )}
        </div>

        <button
          onClick={ButtonClick}
          className="w-[90%] mb-6 h-12 bg-Red rounded-[6px] outfit text-white font-[300] text-[15px] xl:hover:cursor-pointer xl:hover:bg-white xl:hover:text-DarkBlue "
        >
          Create an account
        </button>
        
        <p className="w-[90%] text-center text-white outfit text-[15px] font-[300] mb-6">
          Already have an account?{" "}
          <span
            className="text-Red ml-2 cursor-pointer  "
            onClick={goToLoginPage}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Registration;
