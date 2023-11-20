import React, { useState } from 'react';
import Modal from './Modal';


export default function BlockLabelButton() {
    const [sprints, setSprints] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSprintForModal, setActiveSprintForModal] = useState(null);

    const crearSprint = () => {
        const newSprint = {
            id: sprints.length + 1,
            name: `Sprint ${sprints.length + 1}`,
            incidencias: [] // Un array para almacenar las incidencias
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
                <span className="text-gray-700 mr-2">Backlog ({sprints.length} Sprints)</span>
                <button 
                    onClick={crearSprint}
                    className="bg-tertiary hover:bg-quaternary text-black py-1 px-3 rounded-lg transition-colors duration-200"
                >
                    Crear sprint
                </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                {sprints.map(sprint => (
                    <div key={sprint.id} className="p-2 bg-white shadow-md rounded-lg">
                        {sprint.name}
                        <button
                            data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded"
                            onClick={() => {
                                setActiveSprintForModal(sprint.name);
                                setIsModalOpen(true);
                            }}
                        >
                            Agregar Incidencia
                        </button>
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

