import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export function Sidebar() {

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
      <div
        className={`${open ? "w-48" : "w-20 "
          } bg-gray-900 h-screen items-start flex flex-col justify-start items-center mx-center relative duration-300 `}
      >
        <img
          src="/assets/icons/control.png"
          className={`absolute cursor-pointer -right-3 top-6 w-6 border-dark-purple
        border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center space-y-5">
          <img
            src="/assets/logoPS.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 self-start ${!open && "scale-0"
              }`}
          >
            ProSoft
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Sidebar;
