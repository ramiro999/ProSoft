// Modal.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { get, set, ref, child, push } from "firebase/database";

const Modal = ({ isOpen, onClose, onAddIncidencia, sprintId }) => { // estas son las propiedades que se le pasan al modal
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Hook de react-hook-form

  const [usersList, setUsersList] = useState([]); // Lista de usuarios
  const [formData, setFormData] = useState({ // Hook para el formulario
    nombre: "",
  }); // Datos del formulario


  // Función para obtener la lista de usuarios
  const getUserList = () => {
    get(child(ref(db), `users/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setUsersList(Object.values(data));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);

  //<div>
  //<option>Select User</option>
  //{usersList.map((item) => (
  //return (
  //<option value={item.id} value ={item.id}>
  // {item.name}
  //</option>
  //)
  //)}
  //</div>

  // Función para guardar los datos en la base de datos
  const saveDataToFirebase = (formData) => {
    // Define la ruta en la base de datos para guardar los datos
    const newIncidenciaKey = push( // Genera un ID único para la incidencia
      child(ref(db), `incidencias/${sprintId}`) // Guarda la incidencia en la colección de incidencias
    ).key;
    const incidenciaRef = ref(
      db,
      `incidencias/${sprintId}/${newIncidenciaKey}`
    ); // Referencia a la incidencia en la base de datos

    // Usa la función set para guardar los datos en la base de datos
    set(incidenciaRef, {
      ...formData, // Guarda todos los datos del formulario
      sprintId, // Guarda el ID del sprint
    })
      .then(() => {
        console.log("Incidencia guardada con éxito");
        onClose(); // Cierra el modal
      })
      .catch((error) => {
        console.error("Error al guardar la incidencia: ", error);
      });
  };

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    saveDataToFirebase(data);
    onAddIncidencia(sprintId); // Llama a la función para agregar la incidencia
    //Que puedo hacer aqui para que se muestre la incidencia al momento de agregarla
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <div className="flex justify-center items-center mb-5 text-md sm:text-md md:text-md lg:text-base">
          <h2>Agregar Incidencia al {sprintId}</h2>
        </div>

        {/* Formulario para agregar la incidencia */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de ejemplo */}
          <div className="flex flex-col justify-center items-center bg-gray-200 py-2 px-5 rounded-lg">
            <label htmlFor="incidenciaNombre">Nombre de la Incidencia:</label>

            <input
              className="border border-gray-200 p-2 w-full rounded-lg"
              id="incidenciaNombre"
              type="text"
              {...register("nombre", { required: true })} // Registrar el input para el formulario
            />
            {errors.nombre && <span>Este campo es obligatorio</span>}
          </div>

          {/* Otros campos del formulario... */}

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-3 mt-4">
            <button
              type="submit"
              className="bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded my-1 sm:my-0"
            >
              Agregar
            </button>

            <button
              className="bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded my-1 sm:my-0"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
