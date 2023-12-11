import React, {useEffect, useState} from 'react';
import Sidebar from "../components/common/Sidebar"; 
import TaskCard from "../components/tasks/TaskCard";
import useTareas from '../hooks/useTareas';
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Planner() {
  const tareas = useTareas(); 
  let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        

    }, []);

  const taskStatuses = [
    { status: "Por hacer", color: "bg-quinary" },
    { status: "En proceso", color: "bg-quaternary" },
    { status: "En revision", color: "bg-tertiary" },
    { status: "Finalizado", color: "bg-secondary" },
  ];

  return (
    loading ? <div className="flex justify-center items-center h-screen"><ScaleLoader color="#264653" loading={loading} size={150} /></div> :
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
                  {tareas.filter(tarea => tarea.estado === taskStatus.status).map(tarea => (
                    <TaskCard key={tarea.id} tarea={tarea} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
