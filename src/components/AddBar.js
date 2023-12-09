import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { get, set, ref, child, push } from "firebase/database";
import SprintCard from "./SprintCard";

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

  const handleAddIncidencia = (nuevaIncidencia, sprintId) => {
    setIncidenciasPorSprint(prev => ({
      ...prev,
      [sprintId]: [...(prev[sprintId] || []), nuevaIncidencia]
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

      <div className="max-w-4xl mx-auto">
      {sprints.map((sprint) => (
        <SprintCard
          key={sprint.id}
          sprint={sprint}
          incidencias={incidenciasPorSprint[sprint.id] || []}
          onAddIncidencia={() => {/* Lógica para manejar la adición de incidencias */}}
        />
      ))}
    </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddIncidencia={handleAddIncidencia}
        sprintId={activeSprintForModal}
        
      />
    </>
  );
}
