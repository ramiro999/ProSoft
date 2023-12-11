import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskCard from "../components/tasks/TaskCard";
import Sidebar from "../components/common/Sidebar";
import useComments from "../hooks/useComments";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Comments() {
  const [comments, addComment, deleteComment] = useComments();
  const [newComment, setNewComment] = useState("");
  let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        

    }, []);



  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      const currentDate = new Date().toLocaleDateString();
      const newCommentObject = {
        text: newComment,
        author: "Cesar",
        date: currentDate,
      };
      addComment(newCommentObject);
      setNewComment("");
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId);
  };

  return (
    loading ? <div className="flex justify-center items-center h-screen"><ScaleLoader color="#264653" loading={loading} size={150} /></div> :
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-sextarian overflow-y-auto">
        <h1 className="text-2xl text-white font-semibold bg-primary p-5">
          Proyecto
        </h1>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4">Comentarios</h2>

          <div className="flex flex-wrap -mx-2">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
              >
                <div className="bg-white p-4 rounded shadow relative overflow-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-7 bg-gray-300 rounded-full mr-2">
                        <img src="assets/user.png" alt="" />
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
                  <p className="text-sm text-gray-500 mt-2 text-right">
                    {comment.date}
                  </p>
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
  );
}
