import React, { useState } from "react";
import { Link } from 'react-router-dom'
import TaskCard from "../components/TaskCard";

export default function Planner() {

  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Backlog", src: "User", gap: true, to: "/Backlog" },
    { title: "Planificador", src: "Calendar", to: "/Planner" },
    { title: "Cronograma", src: "Search", to: "/Schedule" },
    { title: "Comentarios", src: "Chart", to: "/Comments" },
    // { title: "Configuraciones", src: "Setting", gap: true, to: "/configuraciones" },
];


  return (
    <div className="flex">
      <div
        className={`${open ? "w-48" : "w-20"} bg-gray-900 h-screen flex flex-col justify-start items-center relative duration-300 sticky top-0`}
      >
        <img
          src="/assets/icons/control.png"
          alt="icon"
          className={`absolute cursor-pointer -right-3 top-6 w-6 border-dark-purple
              border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center mt-2">
          <img
            src="/assets/logoPS.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            ProSoft
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link key={index} to={Menu.to} className="flex w-full">
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                } `}
            >
              <img src={`/assets/icons/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
            </Link>
          ))}
        </ul>
      </div>



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
