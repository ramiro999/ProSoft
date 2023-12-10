import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import Sidebar from '../components/Sidebar';

export default function Planner() {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Backlog", src: "User", gap: true },
    { title: "Planificador ", src: "Calendar" },
    { title: "Cronograma", src: "Search" },
    { title: "Comentarios", src: "Chart" },
    { title: "Configuraciones", src: "Setting", gap: true },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 bg-sextarian">
        <h1 className="text-2xl text-white font-semibold bg-primary p-5">Proyecto</h1>
        <div className="d-flex p-8">
        <h2 className="text-3xl font-bold mb-4 ">Planificador</h2>
          <div className="col-3 ">
            <div className="bg-quinary my-2 px-3 py-2 rounded" >Por Hacer</div>
            <div>
              <TaskCard></TaskCard>
              <TaskCard></TaskCard>
            </div>
          </div>

          <div className="col-3">
            <div className="bg-quaternary my-2 px-3 py-2 rounded">En Proceso</div>
            <div>
              <TaskCard></TaskCard>
            </div>
          </div>

          <div className="col-3">
            <div className="bg-tertiary my-2 px-3 py-2 rounded">En revisión</div>
            <div>
              <TaskCard></TaskCard>
            </div>
          </div>

          <div className="col-3">
            <div className="bg-secondary my-2 px-3 py-2 rounded">Finalizado</div>
            <div>
              <TaskCard></TaskCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
