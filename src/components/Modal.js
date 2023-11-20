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
              className="bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded my-3 sm:my-0"
            >
              Agregar
            </button>

            <button
              className="bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded my-3 sm:my-0"
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
