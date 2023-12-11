// hooks/useComments.js
import { useState, useEffect } from "react";
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { ref, push, set, get, remove } from "firebase/database";

function useComments() {
  const [comments, setComments] = useState([]);

  // Cargar comentarios
  useEffect(() => {
    const commentsRef = ref(db, "comments/");
    get(commentsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setComments(Object.values(data));
      }
    });
  }, []);

  // Agregar comentario
  const addComment = (comment) => {
    const newCommentRef = push(ref(db, "comments/"));
    set(newCommentRef, comment).then(() => {
      setComments((prev) => [...prev, { ...comment, id: newCommentRef.key }]);
    });
  };

  // Eliminar comentario
  const deleteComment = (commentId) => {
    const commentRef = ref(db, `comments/${commentId}`);
    remove(commentRef).then(() => {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    });
  };

  return [comments, addComment, deleteComment];
}

export default useComments;
