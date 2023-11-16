import React, { useState } from 'react';

export default function BlockLabelButton() {
    const [sprints, setSprints] = useState([]);

    const crearSprint = () => {
        const newSprint = {
            id: sprints.length + 1,
            name: `Sprint ${sprints.length + 1}`
        };
        setSprints([...sprints, newSprint]);
    };
    
    return (
        <>
            {/* Tarjeta del Backlog */}
            <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow mb-4">
                <span className="text-gray-700 mr-2">Backlog ({sprints.length} Sprints)</span>
                <button 
                    onClick={crearSprint}
                    className="bg-tertiary hover:bg-quaternary text-black py-1 px-3 rounded-lg transition-colors duration-200"
                >
                    Crear sprint
                </button>
            </div>
            
            {/* Contenedor para las tarjetas de sprints */}
            <div className="grid grid-cols-1 gap-4">
                {sprints.map(sprint => (
                    <div key={sprint.id} className="p-2 bg-white shadow-md rounded-lg">
                        {sprint.name}
                    </div>
                ))}
            </div>
        </>
    );
}
