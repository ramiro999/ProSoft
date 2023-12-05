// SprintCard.js
import React, { useState } from "react";
import Modal from "./Modal";    


function SprintCard({sprintId, sprint, incidencias, onAddIncidencia }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSprintForModal, setActiveSprintForModal] = useState(null);


    return (
        <>
      <div className="mb-4 p-4 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-600">{sprint.name}</h3>
            <p className="text-sm text-gray-500">{sprint.dateRange} ({incidencias.length} Incidencias)</p>
          </div>
          <div className="flex items-center">
            <button className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2">
              Completar sprint
            </button>
            <button className="text-xs bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
              Editar
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
        onClick={() => {
            setActiveSprintForModal(sprint.id);
            setIsModalOpen(true);
          }}
        //onClick={onAddIncidencia} 
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-xs">
          Agregar Incidencia
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        //onAddIncidencia={handleAddIncidencia}
        sprintId={activeSprintForModal}
        
      />

    </>

    );
  }
  
  export default SprintCard;
  