import React, {useState} from "react";
import TaskCard from "../components/TaskCard";

export default function Planner() {
    
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Backlog", src: "User", gap: true },
        { title: "Planificador ", src: "Calendar" },
        { title: "Cronograma", src: "Search" },
        { title: "Comentarios", src: "Chart" },
        { title: "Configuraciones", src: "Setting", gap: true  },
      ];
    
    return (
        <div className="flex">
          <div
            className={` ${
              open ? "w-72" : "w-20 "
            } bg-gray-900 h-screen p-5  pt-8 relative duration-300`}
          >
            <img
              src="/assets/icons/control.png"
              alt="icon"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
              border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
              <img
                src="/assets/logoPS.png"
                className={`cursor-pointer duration-500 ${
                  open && "rotate-[360deg]"
                }`}
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Prosoft
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    index === 0 && "bg-light-white"
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



          <div className="h-screen flex-1 p-7">
            <h1 className="text-2xl text-white font-semibold bg-primary">Proyecto</h1>

            <div className="d-flex">
                
                  <div className="col-3 mx-3">
                    <div className="bg-quinary my-2 px-3 py-2 rounded" >Por Hacer</div>
                    <div>
                        <TaskCard></TaskCard>
                        <TaskCard></TaskCard>
                    </div>
                  </div>

                  <div className="col-3 mx-3">
                    <div className="bg-quaternary my-2 px-3 py-2 rounded">En Proceso</div>
                    <div>
                        <TaskCard></TaskCard>
                    </div>
                  </div>

                  <div className="col-3 mx-3">
                    <div className="bg-tertiary my-2 px-3 py-2 rounded">En revisión</div>
                    <div>
                        <TaskCard></TaskCard>
                    </div>
                  </div>

                  <div className="col-3 mx-3">
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