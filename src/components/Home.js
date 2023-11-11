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
                        src="/assets/logoPS.png"
                        alt="Logo ProSoft"
                        className="w-16 h-16 md:w-20 md:h-20 mr-2"
                    />
                    <h1 className="text-4xl md:text-5xl lg:text-3xl text-white font-extrabold tracking-wide">ProSoft</h1>
                </div>
                <Link
                    to="/login"
                    className="transform scale-100 hover:scale-110 transition-transform duration-300 bg-secondary text-white py-3 px-6 rounded-md hover:bg-quinary text-xl md:text-2xl lg:text-3xl"
                >
                    Iniciar Sesión
                </Link>
            </header>
            <hr className="w-full border-b border-tertiary my-1" />
            {/* Content */}
            <div className="parent grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full md:w-4/5 lg:w-3/5">
                <div className="div1 text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl text-white font-extrabold tracking-wide">La gestión de tareas al alcance de tus manos</p>
                </div>
                <div className="div2 md:pl-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                            className={`w-full overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer ${selectedImage === "tarea2" ? "z-10" : ""
                                }`}
                            onClick={() => handleImageClick("tarea2")}
                        >
                            <img
                                src="/assets/tarea2.png"
                                alt="Tareas 1"
                                className="w-full h-full object-cover rounded-md hover:shadow-lg"
                            />
                        </div>
                        <div
                            className={`w-full overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer ${selectedImage === "tarea4" ? "z-10" : ""
                                }`}
                            onClick={() => handleImageClick("tarea4")}
                        >
                            <img
                                src="/assets/tarea4.png"
                                alt="Tareas 3"
                                className="w-full h-full object-cover rounded-md hover:shadow-lg"
                            />
                        </div>
                    </div>
                </div>
                <div className="div3 text-center">
                    <h2 className="text-5xl md:text-5xl lg:text-5xl text-white font-extrabold tracking-wide mb-5">Desarrolladores</h2>
                    <ul className="text-xl md:text-xl lg:text-xl text-white font-extrabold tracking-wide">
                        <li>Juan Camilo Guerrero Ortega</li>
                        <li>Cesar Enrique Rojas Hernandez</li>
                        <li>Ramiro Santiago Avila Chacon</li>
                    </ul>
                </div>
                <div className="div4 text-center">
                    <p className="text-3xl md:text-4xl lg:text-5xl text-white font-extrabold tracking-wide">En ProSoft podrás organizar de manera más eficiente tus actividades.</p>
                </div>
            </div>
            {selectedImage && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-20"
                    onClick={resetSelectedImage}
                >
                    <img
                        src={`/assets/${selectedImage}.png`}
                        alt="Selected Image"
                        className="max-w-full max-h-full"
                    />
                </div>
            )}
            <footer className="bg-primary">
                <div>
                    <button>hola</button>
                </div>
            </footer>
        </div>
    );
}

export default Home;

