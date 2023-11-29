import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import Modal from "./Modal";

export default function AddBar({ sprintId }) {
  const [sprints, setSprints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSprintForModal, setActiveSprintForModal] = useState(null);
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const incidenciasRef = ref(db, `incidencias/${sprintId}`); // Referencia a la colección de incidencias
    onValue(incidenciasRef, (snapshot) => { // Escucha los cambios en la base de datos
        if (snapshot.exists()) { // Si hay incidencias
            const data = snapshot.val(); // Obtiene los datos
            setIncidencias(Object.values(data)); // Actualiza el estado
        } else { // Si no hay incidencias
            console.log("No hay incidencias.");  // Muestra un mensaje en la consola
        }
    });
}, [sprintId]);





  const crearSprint = () => {
    const newSprint = {
      // Objeto para representar un sprint
      id: sprints.length + 1, // ID del sprint
      name: `Sprint ${sprints.length + 1}`, // Nombre del sprint
      incidencias: [], // Un array para almacenar las incidencias
    };
    setSprints([...sprints, newSprint]);
  };

  const agregarIncidencia = (sprintId) => {
    // Aquí lógica para añadir la incidencia al sprint correspondiente
    
    console.log(`Añadir incidencia a ${sprintId}`);
    setIsModalOpen(false); // Cerrar el modal
  };

  

  return (
    <>
      <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow mb-4">
        <span className="text-gray-700 mr-2">
          Backlog ({sprints.length} Sprints)
        </span>
        <button
          onClick={crearSprint}
          className="bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded-lg transition-colors duration-200"
        >
          Crear sprint
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sprints.map((sprint) => (
          <div
            key={sprint.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow mb-4"
          >
            {sprint.name}
            <button
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              className="ml-2 bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded"
              onClick={() => {
                setActiveSprintForModal(sprint.id);
                setIsModalOpen(true);
              }}
            >
              Agregar Incidencia
            </button>

            <div>
              {incidencias
                .filter((inc) => inc.sprintId === sprint.id)
                .map((incidencia, index) => (
                  <div key={index}>
                    <h3>{incidencia.nombre}</h3>
                    {/* ... otros detalles de la incidencia ... */}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar incidencias */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddIncidencia={agregarIncidencia}
        sprintId={activeSprintForModal}
      />
    </>
  );
}
