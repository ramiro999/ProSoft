  // Modal.js
  import React, { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { db } from "../firebase";
  import { get, set, ref, child, push } from "firebase/database";


  const Modal = ({ isOpen, onClose, onAddIncidencia, sprintId, actualizarIncidencias }) => {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const [incidencias, setIncidencias] = useState([]);
  
    const getIncidencias = () => {
      get(child(ref(db), `incidencias/${sprintId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const data = snapshot.val();
          setIncidencias(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error)=> {
        console.error(error);
      });
    };
  
    useEffect(() => {
      getIncidencias();
    }, []);
  
    const saveDataToFirebase = (formData) => {
      const newIncidenciaKey = push(child(ref(db), `incidencias/${sprintId}`)).key;
      const incidenciaRef = ref(db, `incidencias/${sprintId}/${newIncidenciaKey}`);
  
      set(incidenciaRef, {
        ...formData,
        sprintId,
      })
      .then(() => {
        console.log("Incidencia guardada con éxito");
        actualizarIncidencias({ ...formData, id: newIncidenciaKey });
        onAddIncidencia({ ...formData, id: newIncidenciaKey }, sprintId);
        onClose();
      })
      .catch((error) => {
        console.error("Error al guardar la incidencia: ", error);
      });
    };
  
    const onSubmit = (data) => {
      console.log("Form data: ", data);
      saveDataToFirebase(data);
    };
  
    if (!isOpen) return null;


    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded">
          <div className="flex justify-center items-center mb-5 text-md sm:text-md md:text-md lg:text-base">
            <h2>Agregar Incidencia al {sprintId}</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
      
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