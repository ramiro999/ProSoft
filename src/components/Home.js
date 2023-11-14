import React, { useState } from "react";
// import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";

export function Home() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    // const { user } = useAuth();
    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleImageClick = (imageId) => {
    //     setSelectedImage(imageId);
    // };

    // const resetSelectedImage = () => {
    //     setSelectedImage(null);
    // };

    return (
        <div className="bg-sextarian min-h-screen flex flex-col items-center">
            {/* Header */}
            {/* <header className="bg-primary w-full p-1 shadow md:flex md:items-center md:justify-between  ">
                <div className="p-1 flex items-center">
                    <img
                        src="/assets/p1.png"
                        alt="Logo ProSoft"
                        className="w-15 h-10 sm:w-21 sm:h-15 mr-2"
                    />
                    <h1 className="text-3xl sm:text-4    lg:text-5 text-white font-extrabold tracking-wide">ProSoft</h1>
                </div>
                <ul >
                    <li>
                        <Link
                            to="/register"
                            className="transform scale-90 hover:scale-95 transition-transform duration-100 p-2 bg-secondary text-white py-2 px-8 rounded-sm hover:bg-sextarian text-7 lg:text-2"
                        >
                            Registrarse
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="transform scale-90 hover:scale-95 transition-transform duration-100 p-2 bg-secondary text-white py-2 px-8 rounded-sm hover:bg-sextarian text-7 lg:text-2"
                        >
                            Iniciar Sesión
                        </Link> 
                    </li>
                </ul>
                <img className="w-10' h-7 px-3 cursor-pointer sm:hidden" src="/assets/menu.png" alt="menu" />
            </header> */}
            <nav className="p-5 w-full bg-primary shadow sm:flex sm:items-center sm:justify-between">
                <div>
                    <span className="text-2xl text-white font-bold cursor-pointer">
                        <img className="h-10 inline" src="/assets/p1.png" />ProSoft
                    </span>
                </div>

                <div
                    className={`lg:hidden cursor-pointer p-2`}
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >   
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                    )}
                </div>
                {/* Lista de navegación */}
                <ul
                    className={`lg:flex lg:items-start lg:w-auto  ${
                    isMenuOpen ? 'block' : 'hidden'
                    }`}
                >
                    <li className="mb-2 lg:mb-0">
                        <Link
                            to="/register"
                            className="block px-4 py-2 text-white font-bold lg:inline-block lg:mt-0 hover:text-gray-300"
                        >
                            Registrarse
                        </Link>
                    </li>
                    <li className="mb-2 lg:mb-0">
                        <Link
                            to="/login"
                            className="block px-4 py-2 text-white font-bold lg:inline-block lg:mt-0 hover:text-gray-300"
                        >
                            Iniciar Sesión
                        </Link>
                    </li>
                </ul>
                    {/* <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto">
                    <li className="mx-4 my-6 md:my-0 ">
                        <Link
                            to="/register"
                            className="transform scale-90 hover:scale-95 transition-transform duration-100 p-2 bg-secondary text-white px-8 rounded-sm hover:bg-sextarian text-7 lg:text-2"
                        >
                            Registrarse
                        </Link>
                    </li>
                    <li className="mx-4 my-6 md:my-0 ">
                        <Link
                            to="/login"
                            className="transform scale-90 hover:scale-95 transition-transform duration-100 p-2 bg-secondary text-white px-8 rounded-sm hover:bg-sextarian text-7 lg:text-2"
                        >
                            Iniciar Sesión
                        </Link>
                    </li>
                </ul> */}
                
            </nav>
            {/* Content */}
            <div className="bg-seven p-6 grid grid-cols-1 flex flex-col sm:flex-row items-center justify-center h-full sm:grid-cols-2 ">
                <div className="order-2 p-6 sm:order-1 text-center">
                    <p className="mt-2 text-2xl sm:text-4xl text-white text-left font-bold rounded-lg">ProSoft te proporciona la estructura que necesitas sin sacrificar la flexibilidad
                        <br />
                        <span className="text-2xl">Deja atrás la complejidad y abraza la simplicidad</span>
                    </p>
                </div>
                <img
                    src="/assets/Scrum3.png"
                    alt="Imagen"
                    className="w-1/2 md:h-90 sm:w-90 order-1 sm:order-2 bg-primary rounded-3xl p-4  mx-auto my-auto"
                />
            </div>
        </div>
    );
}

export default Home;

