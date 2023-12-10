import React, { useState } from "react";
import { Link } from 'react-router-dom';
import TaskCard from "../components/TaskCard";

export default function Comments() {

    const [open, setOpen] = useState(true);

    const Menus = [
        { title: "Backlog", src: "User", gap: true, to: "/Backlog" },
        { title: "Planificador", src: "Calendar", to: "/Planner" },
        { title: "Cronograma", src: "Search", to: "/Schedule" },
        { title: "Comentarios", src: "Chart", to: "/Comments" },
        // { title: "Configuraciones", src: "Setting", gap: true, to: "/configuraciones" },
    ];

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            const currentDate = new Date().toLocaleDateString();
            const newCommentObject = {
                id: Date.now(),
                text: newComment,
                author: 'Prot3o',
                date: currentDate,
            };
            setComments([...comments, newCommentObject]);
            setNewComment('');
        }
    };

    const handleDeleteComment = (commentId) => {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
    };

    return (
        <div className="flex h-screen">
            <div
                className={`${open ? "w-48" : "w-20"} bg-gray-900 h-screen flex flex-col justify-start items-center relative duration-300 sticky top-0`}
            >
                <img
                    src="/assets/icons/control.png"
                    alt="icon"
                    className={`absolute cursor-pointer -right-3 top-6 w-6 border-dark-purple
                    border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex items-center mt-2">
                    <img
                        src="/assets/logoPS.png" alt=""
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        ProSoft
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Link key={index} to={Menu.to} className="flex w-full">
                            <li
                                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
                            >
                                <img src={`/assets/icons/${Menu.src}.png`} alt={Menu.title} />
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 bg-sextarian">
                <h1 className="text-2xl text-white font-semibold bg-primary p-5">Proyecto</h1>
                <div className="bg-sextarian p-8">
                    <h2 className="text-3xl font-bold mb-4">Comentarios</h2>

                    <div className="flex flex-wrap -mx-2">
                        {comments.map((comment) => (
                            <div key={comment.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                                <div className="bg-white p-4 rounded shadow relative overflow-auto">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center">
                                            <div className="w-7 bg-gray-300 rounded-full mr-2">
                                                <img src="assets/user.png" alt=""/>
                                            </div>
                                            <p className="font-bold">{comment.author}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="w-7 text-red-500 cursor-pointer"
                                        >
                                            <img src="assets/trash.png" alt="" />
                                        </button>
                                    </div>
                                    <p className="text-gray-800">{comment.text}</p>
                                    <p className="text-sm text-gray-500 mt-2 text-right">{comment.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Añade un comentario..."
                            className="w-full p-2 border rounded"
                        />
                        <button
                            onClick={handleAddComment}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Agregar comentario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
