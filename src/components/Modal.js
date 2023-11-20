// Modal.js
import React from 'react';
import { useForm } from 'react-hook-form';

const Modal = ({ isOpen, onClose, onAddIncidencia, sprintId }) => {
   
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        onAddIncidencia(sprintId);
        onClose();
    };
     
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2>Agregar Incidencia al {sprintId}</h2>
        
        {/* Formulario para agregar la incidencia */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de ejemplo */}
          <div>
            <label htmlFor="incidenciaNombre">Nombre de la Incidencia:</label>
            <input 
              id="incidenciaNombre" 
              type="text" 
              {...register("nombre", { required: true })} // Registrar el input para el formulario
            />
            {errors.nombre && <span>Este campo es obligatorio</span>}
          </div>

          {/* Otros campos del formulario... */}

          <button type="submit">Agregar</button>
        </form>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
