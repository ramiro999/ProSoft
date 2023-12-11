import React from 'react';
import Sidebar from "../components/common/Sidebar"; // Asegúrate de que la ruta sea correcta
import TaskCard from "../components/tasks/TaskCard";

export default function Planner() {
  const taskStatuses = [
    { status: "Por Hacer", color: "bg-quinary" },
    { status: "En Proceso", color: "bg-quaternary" },
    { status: "En revisión", color: "bg-tertiary" },
    { status: "Finalizado", color: "bg-secondary" },
  ];

  return (
    <div className="flex overflow-hidden h-screen">
      <Sidebar />
      <div className="flex-1 bg-sextarian overflow-y-auto">
        <h1 className="text-2xl text-white font-semibold bg-primary p-5">Proyecto</h1>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 ">Planificador</h2>
          <div className="grid grid-cols-4 gap-4">
            {taskStatuses.map((taskStatus, index) => (
              <div key={index} className="col-span-1">
                <div className={`${taskStatus.color} my-2 px-3 py-2 rounded`}>{taskStatus.status}</div>
                <div>
                  <TaskCard />
                  {/* Repite el <TaskCard /> según sea necesario */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
