import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export function Home() {
    const { user } = useAuth();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageId) => {
        setSelectedImage(imageId);
    };

    const resetSelectedImage = () => {
        setSelectedImage(null);
    };
    let [open,setOpen]=useState(false);
    return (    
        <div className="bg-sextarian">
            <div className='shadow-md w-full items-center fixed top-0 left-0'>
                <div className='md:flex items-center justify-between bg-primary py-1 md:px-10 '>
                    <div className='font-bold text-2xl cursor-pointer flex items-center text-white p-1'>
                        <span className='text-3xl text-indigo-600 mr-1 '>
                            <img className="h-10 inline" src="/assets/p1.png" alt="Imagen"/>
                        </span>
                        ProSoft
                    </div>
                    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-3 cursor-pointer flex md:hidden items-center'>
                        <img name={open ? 'close':'menu'} className="h-8 inline" src="/assets/menu.png" alt="Imagen" />
                    </div>
                    <ul className={`md:flex md:items-center md:pb-0  absolute md:static bg-primary md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-800 ease-in ${open ? 'top-15 ':'top-[-490px]'}`}>
                        <li className="mb-2 lg:mb-0">
                                <Link
                                    to="/register"
                                    className="block px-4 py-4 text-white font-bold lg:inline-block lg:mt-0 hover:text-gray-300"
                                >
                                    Registrarse
                                </Link>
                            </li>
                            <li className="mb-2 lg:mb-0">
                                <Link
                                    to="/login"
                                    className="block px-4 py-4 text-white font-bold lg:inline-block lg:mt-0 hover:text-gray-300"
                                >
                                    Iniciar Sesión
                                </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="bg-seven p-6 grid grid-cols-1 flex flex-col sm:flex-row items-center justify-center sm:grid-cols-2">
                <div className="order-2 p-6 sm:order-1 text-center">
                    <p className="mt-2 text-2xl sm:text-4xl text-white text-left font-bold rounded-lg">
                    ProSoft te proporciona la estructura que necesitas sin sacrificar la flexibilidad
                    <br />
                    <span className="text-2xl">Deja atrás la complejidad y abraza la simplicidad</span>
                    </p>
                </div>
                <img
                    src="/assets/Scrum3.png"
                    alt="Imagen"
                    className="w-1/2 md:h-90 sm:w-90 order-1 sm:order-2 bg-primary rounded-3xl p-4 mx-auto my-auto"
                />
            </div>
        </div>
    );
}

export default Home;

