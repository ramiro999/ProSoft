import { useState, useEffect } from 'react';
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta
import { get, ref } from "firebase/database";

const useTareas = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const tareasRef = ref(db, 'sprints'); 
    get(tareasRef).then(snapshot => {
      if (snapshot.exists()) {
        const sprintsData = snapshot.val();
        const incidencias = [];

        // Transforma los datos de sprints a un formato de incidencias
        Object.values(sprintsData).forEach(sprint => {
          if(sprint.incidencias) {
            Object.entries(sprint.incidencias).forEach(([id, incidencia]) => {
              incidencias.push({ id, ...incidencia });
            });
          }
        });
        console.log(incidencias);
        setTareas(incidencias);
      }
    }).catch(error => console.error(error));
  }, []);

  return tareas;
};

export default useTareas;
