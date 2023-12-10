import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { get, ref, child, set, push } from "firebase/database";
import SprintCard from "./SprintCard";

export default function AddTask() {
  const [sprints, setSprints] = useState([]);
  const [incidenciasPorSprint, setIncidenciasPorSprint] = useState({});

  const getSprintsFromFirebase = () => {
    get(ref(db, `sprints`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const sprintsData = snapshot.val();
          const sprintsArray = Object.values(sprintsData);
          setSprints(sprintsArray);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getSprintsFromFirebase();
  }, []);

  useEffect(() => {
    const getSprintIncidencias = async () => {
      for (const sprint of sprints) {
        await get(child(ref(db), `incidencias/${sprint.id}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const incidenciasData = snapshot.val();
              const incidenciasArray = Object.values(incidenciasData);
              setIncidenciasPorSprint((prevIncidencias) => ({
                ...prevIncidencias,
                [sprint.id]: incidenciasArray,
              }));
            } else {
              setIncidenciasPorSprint((prevIncidencias) => ({
                ...prevIncidencias,
                [sprint.id]: [],
              }));
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    if (sprints.length > 0) {
      getSprintIncidencias();
    }
  }, [sprints]);

  const crearSprint = () => {
    const newSprintRef = push(ref(db, 'sprints'));
    const newSprint = {
      id: newSprintRef.key, // Usar la clave generada por Firebase como ID
      name: `Sprint ${sprints.length + 1}`, // Asegúrate de que el nombre del sprint sea único
      // Añade cualquier otra propiedad que necesites para un sprint
    };
  
    set(newSprintRef, newSprint)
      .then(() => {
        // El sprint se ha guardado en Firebase, ahora actualiza el estado local
        setSprints([...sprints, newSprint]);
      })
      .catch((error) => {
        console.error("Error al crear un nuevo sprint: ", error);
      });
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


  </>
);
}

// Compare this snippet from src/components/tasks/TaskCard.js:
