import React, { useState } from "react";
import Input from "../components/common/Input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import validationLogin from "../validations/validationLogin";

export default function LoginForm() {
  const [visible, setVisible] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const toggle = () => {
    setVisible(!visible);
  };

  const onSubmitFunction = async (user) => {
    try {
      await signup(user.email, user.password);
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("email", { type: "usernotfound" }, { shouldFocus: true });
      }
      if (error.code === "auth/wrong-password") {
        setError("password", { type: "passwordwrong" }, { shouldFocus: true });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-5 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl mx-auto bg-gray-200 rounded-lg">
      <div className="hidden sm:block">
        <Link
          to="/login"
          className="transform scale-100 hover:scale-110 transition-transform duration-300 bg-tertiary py-3 px-6 rounded-md hover:bg-quinary md:text-2xl lg:text-3xl absolute mt-2 ml-24"
        >
          <img
            src="/assets/back.png"
            alt="Back icon"
            className="w-6 h-6 md:w-8 md:h-8" // Ajusta el tamaño aquí con las clases de Tailwind CSS
          />
        </Link>
          <Link
            to="/"
            className="transform scale-100 hover:scale-110 transition-transform duration-300 bg-tertiary text-white py-3 px-6 rounded-md hover:bg-quinary text-xl md:text-2xl lg:text-3xl absolute ml-2 mt-2"
          >
            <img
              src="/assets/home.png"
              alt="House icon"
              className="w-6 h-6 md:w-8 md:h-8" // Ajustar el tamaño
            />
          </Link>
          <img
            className="w-full h-full rounded-l-lg object-cover shadow-[0_3px_10px_rgb(0,0,0,0.5)]"
            src="/assets/register_2.png"
            alt="Register"
          />
        </div>
        <div className="bg-fray-800 bg-gray-200 flex justify-center items-center rounded-r-lg">
          <form
            onSubmit={handleSubmit(onSubmitFunction)}
            className="w-full max-w-md p-6 bg-gray-900 rounded-lg"
          >
            <h2 className="text-2xl text-white font-bold text-center">
              REGISTRARSE
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label>Correo electrónico</label>
              <Input
                errors={errors}
                validation={validationLogin}
                register={register}
                nameRegister="email"
                placeholder="tucorreo@gmail.com"
                className="w-full rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                type="text"
              />
            </div>
            <div className="flex flex-col text-gray-400 relative py-2">
              <label>Contraseña</label>
              <Input
                errors={errors}
                validation={validationLogin}
                register={register}
                nameRegister="password"
                placeholder="***********"
                className="w-full rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                typeInput={visible === false ? "password" : "text"}
              />
              <div className="text-2xl absolute my-11 right-2 text-gray-400">
                {visible === false ? (
                  <AiOutlineEye onClick={toggle} />
                ) : (
                  <AiOutlineEyeInvisible onClick={toggle} />
                )}
              </div>
            </div>

            <button className="w-full my-5 py-2 bg-gray-300 shadow-lg duration-200 shadow-teal hover:shadow-teal-50/30 text-white-200 font-bold rounded-lg">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
