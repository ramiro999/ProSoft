  // Modal.js
  import React, { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { db } from "../firebase";
  import { get, set, ref, child, push } from "firebase/database";


  const Modal = ({ isOpen, onClose, onAddIncidencia, sprintId, actualizarIncidencias }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [incidencias, setIncidencias] = useState([]);
    const [formData, setFormData] = useState({
      nombre: "",
    });
  
    const getIncidencias = () => {
      get(child(ref(db), `incidencias/${sprintId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setIncidencias(data);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      getIncidencias();
    }, [sprintId]);
  
    const saveDataToFirebase = (formData) => {
      const newIncidenciaKey = push(child(ref(db), `incidencias/${sprintId}`)).key;
      const incidenciaRef = ref(db, `incidencias/${sprintId}/${newIncidenciaKey}`);
    
      set(incidenciaRef, {
        ...formData,
        sprintId,
      })
        .then(() => {
          console.log("Incidencia guardada con éxito");
    
          // Después de guardar la incidencia, obtenemos los datos actualizados
          get(child(ref(db), `incidencias/${sprintId}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const newIncidencia = snapshot.val();
    
                // Agregamos la nueva incidencia al estado local y al estado global (si es necesario)
                setIncidencias([...incidencias, newIncidencia]);
    
                // Llamamos a onAddIncidencia aquí para pasar la nueva incidencia a SprintCard.js
                if (onAddIncidencia) {
                  onAddIncidencia(newIncidencia);
                }
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
    
          onClose();
        })
        .catch((error) => {
          console.error("Error al guardar la incidencia: ", error);
        });
    };
    
  
    const onSubmit = (data) => {
      console.log("Form data: ", data);
      saveDataToFirebase(data);
    
      // Obtén una copia del array de incidencias actual
      const incidenciasCopy = [...incidencias];
    
      // Agregar la nueva incidencia al array de incidencias
      incidenciasCopy.push(data);
    
      // Actualizar el estado local con el nuevo array de incidencias
      setIncidencias(incidenciasCopy);
    
      onClose();
    };
    
    
    
  
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">


        <div className="text-center mb-4">
          <h2 className="font-bold text-xl mb-2">Agregar Incidencia al {sprintId}</h2>
          <p className="text-gray-700 text-sm">Introduce los detalles de la incidencia a continuación.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="incidenciaNombre" className="block text-sm font-medium text-gray-700">Nombre de la Incidencia:</label>
            <input
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="incidenciaNombre"
              type="text"
              {...register("nombre", { required: true })}
            />
            {errors.nombre && <span className="text-red-500 text-xs italic">Este campo es obligatorio</span>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Agregar
            </button>
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
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