import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child, push } from "firebase/database";

import Modal from "./Modal";

export default function AddBar({ sprintId }) {
  const [sprints, setSprints] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSprintForModal, setActiveSprintForModal] = useState(null);
  const [incidenciasPorSprint, setIncidenciasPorSprint] = useState({});

  const getIncidenciasPorSprint = (sprintId) => {
    get(child(ref(db), `incidencias/${sprintId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const incidencias = snapshot.val();
          // Asegúrate de que el valor que recibes es un array, 
          // o conviértelo a un array si es necesario
          const incidenciasArray = Array.isArray(incidencias) ? incidencias : Object.values(incidencias);
          setIncidenciasPorSprint(prevIncidencias => ({
            ...prevIncidencias,
            [sprintId]: incidenciasArray
          }));
        } else {
          setIncidenciasPorSprint(prevIncidencias => ({
            ...prevIncidencias,
            [sprintId]: []
          }));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    sprints.forEach(sprint => {
      getIncidenciasPorSprint(sprint.id);
    });
  }, [sprints]);

  const agregarIncidencia = (nuevaIncidencia, sprintId) => {
    setIncidenciasPorSprint(prev => ({
      ...prev,
      [sprintId]: [...(prev[sprintId] || []), nuevaIncidencia] // Asegúrate de que prev[sprintId] es un array
    }));
  };
  


  //const actualizarIncidencias = (nuevaIncidencia) => {
    //setIncidencias(prevIncidencias => [...prevIncidencias, nuevaIncidencia]);
  //};
  
  const crearSprint = () => {
    const newSprint = {
      // Objeto para representar un sprint
      id: sprints.length + 1, // ID del sprint
      name: `Sprint ${sprints.length + 1}`, // Nombre del sprint
      incidencias: [], // Un array para almacenar las incidencias
    };
    setSprints([...sprints, newSprint]);
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
        <div key={sprint.id} className="sprint-container">
          <h2>{sprint.name}</h2>
          <button onClick={() => {
            setActiveSprintForModal(sprint.id);
            setIsModalOpen(true);
          }}>
            Agregar Incidencia
          </button>
          <div>
            {/* Asegurarse de que incidenciasPorSprint[sprint.id] es un array antes de mapearlo */}
            {Array.isArray(incidenciasPorSprint[sprint.id]) && incidenciasPorSprint[sprint.id].map((incidencia, index) => (
              <div key={index}>{incidencia.nombre}</div>
            ))}
          </div>
        </div>
      ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddIncidencia={agregarIncidencia}
        sprintId={activeSprintForModal}
        //actualizarIncidencias={actualizarIncidencias}
      />
    </>
  );
}
