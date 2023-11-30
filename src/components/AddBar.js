import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child, push } from "firebase/database";

import Modal from "./Modal";

export default function AddBar({ sprintId }) {
  const [sprints, setSprints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSprintForModal, setActiveSprintForModal] = useState(null);
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


  const actualizarIncidencias = (nuevaIncidencia) => {
    setIncidencias(prevIncidencias => [...prevIncidencias, nuevaIncidencia]);
  };
  
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
              {Object.keys(incidencias).map((key) => {
                return (
                  <div key={key}>
                    <h3>
                      {incidencias[key].nombre}
                    </h3>
                    </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddIncidencia={agregarIncidencia}
        sprintId={activeSprintForModal}
        actualizarIncidencias={actualizarIncidencias}
      />
    </>
  );
}
