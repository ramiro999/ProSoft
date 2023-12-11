  // SprintCard.js
  import React, { useState, useEffect } from "react"; 
  import Swal from "sweetalert2"
  import { db } from "../../firebase";
import { get, set, ref, child, push } from "firebase/database";

  function SprintCard({sprintId, sprint}) {
      const [incidencias, setIncidencias] = useState([]);
      const [nuevaIncidencia, setNuevaIncidencia] = useState("");
      const [showInput, setShowInput] = useState(false);

      const handleAgregarIncidencia = () => {
        setShowInput(true);
      };
    
      const handleGuardarIncidencia = () => {
        if (nuevaIncidencia.trim() === "") {
          return;
        }
      
        const sprintIncidenciasRef = ref(db, `sprints/${sprint.id}/incidencias`);
        const newIncidenciaRef = push(sprintIncidenciasRef);
      
        set(newIncidenciaRef, {
          nombre: nuevaIncidencia,
          estado: "Por hacer",
        })
        .then(() => {
          // Actualizar el estado local
          setIncidencias(prevIncidencias => [
            ...prevIncidencias,
            { id: newIncidenciaRef.key, nombre: nuevaIncidencia, estado: "Por hacer" }
          ]);
          setNuevaIncidencia("");
          setShowInput(false);
        })
        .catch((error) => {
          console.error("Error al guardar la incidencia: ", error);
        });
      };
      

      useEffect(() => {
        const sprintIncidenciasRef = ref(db, `sprints/${sprint.id}/incidencias`);
      
        get(sprintIncidenciasRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const incidenciasData = snapshot.val();
              const incidenciasArray = Object.values(incidenciasData);
              setIncidencias(incidenciasArray);
            } else {
              setIncidencias([]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }, [sprint.id]); // Make sure to use sprint.id here
      
    




      const handleButtonClick = () => {
        Swal.fire({
          title: "¿Deseas completar el sprint?",
          text: "No podrás revertirlo!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, completar",
          cancelButtonText: "No, cancelar" 
        }).then((result) => {
          if (result.isConfirmed) {
            
            Swal.fire(
              "¡Completado!", 
              "El sprint ha sido completado.", 
              "success" 
            );
            console.log('Sprint completado!');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            
            Swal.fire(
              "Cancelado", 
              "El sprint no ha sido completado", 
              "info" 
            );
          }
        });
      };


      const handleEditButtonClick = () => {
        Swal.fire({
          title: "¿Deseas editar el sprint?",
          text: "Puedes realizar cambios en la configuración del sprint.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, editar",
          cancelButtonText: "No, cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            // Lógica para manejar la confirmación de edición
            Swal.fire(
              "Modo de edición activado", 
              "Ahora puedes editar el sprint.", 
              "info" 
            );
            console.log('Modo de edición activado');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              "Edición cancelada", 
              "No se han realizado cambios en el sprint", 
              "error" 
            );
          }
        });
      };

      const handleDeleteButtonClick = () => {
        Swal.fire({
          title: "¿Estás seguro de que quieres eliminar el sprint?",
          text: "¡No podrás revertir esta acción!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "No, cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            // Lógica para manejar la confirmación de eliminación
            Swal.fire(
              "Eliminado", 
              "El sprint ha sido eliminado.", 
              "success" 
            );
            console.log('Sprint eliminado');
            
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Lógica para manejar la cancelación
            Swal.fire(
              "Cancelado", 
              "El sprint no ha sido eliminado", 
              "error" 
            );
          }
        });
      };


      
      
      
      
      

      return (
          <>
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-indigo-600">{sprint.name}</h3>
              <p className="text-sm text-gray-500">{sprint.dateRange} ({incidencias.length} Incidencias)</p>
            </div>

            <div className="flex items-center">
              <button 
                onClick={handleButtonClick}
                className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
              >
                Completar sprint
              </button>

              <button 
                onClick={handleEditButtonClick}
                className="text-xs bg-tertiary hover:bg-quaternary text-white py-1 px-3 rounded mr-2">
                Editar
              </button>

              <button 
                onClick={handleDeleteButtonClick}
                className="text-xs bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-2">
                Eliminar
              </button>

            </div>

          </div>
          <div>
            {incidencias.map((incidencia, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded mb-2">
                <span className="text-sm font-medium">{incidencia.nombre}</span>
                <select className="text-xs rounded border border-gray-300 text-gray-700 py-1 px-2">
                  <option>Finalizada</option>
                  <option>En revisión</option>
                  <option>En curso</option>
                  <option>Por hacer</option>
                </select>
              </div>
            ))}
          </div>


          <button 
          onClick={handleAgregarIncidencia}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-xs">
            Agregar Incidencia
          </button>


          {showInput && (
        <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded mb-2">
          <input
            type="text"
            value={nuevaIncidencia}
            onChange={(e) => setNuevaIncidencia(e.target.value)}
            placeholder="Nombre de la Incidencia"
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleGuardarIncidencia}
            className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
          >
            Guardar
          </button>
        </div>
      )}

        </div>

      </>

      );
    }
    
    export default SprintCard;
    