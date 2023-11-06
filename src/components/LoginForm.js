import React, { useEffect, useState } from "react";
import Input from "./Input";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useAuth } from "../context/authContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import validationLogin from "../validations/validationLogin";

export default function LoginForm() {
  const [visible, setVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue === "true") {
      setRememberMe(true);
    }
  }, []);

  const toggle = () => {
    setVisible(!visible);
  };

  const onSubmitFunction = async (user) => {
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("email", { type: "usernotfound" }, { shouldFocus: true });
      }
      if (error.code === "auth/wrong-password") {
        setError("password", { type: "passwordwrong" }, { shouldFocus: true });
      }
    }
  };

  const handleRememberChange = (event) => {
    const checked = event.target.checked;
    setRememberMe(checked);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen px-5 py-5">
      <div className="hidden sm:block">
        <img
          className="w-full h-full rounded-l-lg object-cover shadow-[0_3px_10px_rgb(0,0,0,0.5)]"
          src="/assets/image-2.png"
          alt="Login"
        />
      </div>
      <div className="bg-fray-800 flex flex-col bg-gray-200 relative justify-center rounded-r-lg shadow-[0_3px_10px_rgb(0,0,0,0.5)]">
        <form
          onSubmit={handleSubmit(onSubmitFunction)}
          className="max-w-[400px]-w-full mx-20 bg-gray-900 p-10 px-8 rounded-lg"
        >
          <h2 className="text-4xl text-white font-bold text-center">
            INICIAR SESION
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Correo electrónico</label>
            <Input
              errors={errors}
              validation={validationLogin}
              register={register}
              nameRegister="email"
              placeholder="tucorreo@gmail.com"
              className="w-full rounded-lg bg-gray-700 mt-2 p-2 focus:border-bñlue-500 focus:bg-gray-800 focus:outline-none"
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

          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input
                className="mr-2"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberChange}
              />
              Recordarme
            </p>
            <p className="text-gray-400 text-sm hover:cursor-pointer hover:underline hover:text-blue-800" onClick={() => navigate('/')}>
             Olvidé la contraseña
            </p>
          </div>
          <button className="w-full my-5 py-2 bg-stone-400 shadow-lg duration-200 shadow-teal hover:shadow-teal-50/30 text-gray-800 font-bold rounded-lg">
            INGRESAR
          </button>
        </form>
      </div>
    </div>
        
  );
}