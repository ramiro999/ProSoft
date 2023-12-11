import React from 'react';
import Sidebar from '../components/common/Sidebar'; // Asegúrate de que la ruta sea correcta
import AddTask from '../components/tasks/AddTask';

export default function Backlog() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-sextarian overflow-y-auto">
                <h1 className="text-2xl text-white font-semibold bg-primary p-5">Proyecto</h1>
                <div className="p-8">
                    <h2 className="text-3xl font-bold mb-4">Backlog</h2>
                    <AddTask />
                </div>
            </div>
        </div>
    );
}
