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

    return (
        <div className="bg-sextarian min-h-screen flex flex-col items-center">
            {/* Header */}
            <header className="bg-primary w-full p-1 flex justify-between items-center">
                <div className="p-1 flex items-center">
                    <img
                        src="/assets/p1.png"
                        alt="Logo ProSoft"
                        className="w-15 h-10 sm:w-21 sm:h-15 mr-2"
                    />
                    <h1 className="text-3xl sm:text-4    lg:text-5 text-white font-extrabold tracking-wide">ProSoft</h1>
                </div>
                <div className="flex hidden sm:flex">
                    <Link
                        to="/register"
                        className="transform scale-90 hover:scale-95 transition-transform duration-100 p-2 bg-secondary text-white py-2 px-8 rounded-sm hover:bg-sextarian text-7 lg:text-2"
                    >
                        Registrarse
                    </Link>
                    <Link
                        to="/login"
                        className="transform scale-90 hover:scale-95 transition-transform duration-100 p-2 bg-secondary text-white py-2 px-8 rounded-sm hover:bg-sextarian text-7 lg:text-2"
                    >
                        Iniciar Sesión
                    </Link>
                </div>
                <img className="w-10' h-7 px-3 cursor-pointer sm:hidden" src= "/assets/menu.png" />
            </header>
            {/* Content */}
            <div className="parent bg-secondary grid grid-cols-1 flex flex-col sm:flex-row items-center justify-center w-full sm:grid-cols-2 ">
                <div className="p-4 text-white">
                    <h1 className="text-4xl font-bold">Título</h1>
                    <p className="mt-2 text-lg">Texto descriptivo aquí...</p>
                </div>
                <img
                    src="/assets/Scrum1.png"
                    alt="Imagen"
                    className="w-70 sm:w-50  object-cover"
                />
            </div>
        </div>
    );
}

export default Home;

