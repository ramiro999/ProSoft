import React, { useState, useEffect } from 'react';
import Gantt from '../components/Gantt';
import Toolbar from '../components/toolbar/Toolbar';
import MessageArea from '../components/messageArea/MessageArea';
import Sidebar from '../components/common/Sidebar';
import ScaleLoader from "react-spinners/ScaleLoader";

function Schedule() {
  let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        

    }, []);
  const initialData = {
    data: [
      { id: 1, text: 'Task #1', start_date: '2020-02-12', duration: 3, progress: 0.6 },
      { id: 2, text: 'Task #2', start_date: '2020-02-16', duration: 3, progress: 0.4 }
    ],
    links: [
      { id: 1, source: 1, target: 2, type: '0' }
    ]
  };

  const [zoom, setZoom] = useState('Days');
  const handleZoomChange = (zoomValue) => {
    setZoom(zoomValue);
  };

  const handleDataUpdate = (type, action, item, id) => {
    console.log('Data Updated:', type, action, item, id);
  };

  const messages = []; // Mensajes asociados con el diagrama

  return (
    loading ? <div className="flex justify-center items-center h-screen"><ScaleLoader color="#264653" loading={loading} size={150} /></div> :
  
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-sextarian"> {/* Ajuste: Ahora es un contenedor flex-column */}
        <div className="bg-primary p-5">
          <h1 className="text-2xl text-white font-semibold">Proyecto</h1>
        </div>
        
        <h2 className="text-3xl font-bold m-4 ">Diagrama de Gantt</h2>

        <Toolbar
          zoom={zoom}
          onZoomChange={handleZoomChange}
        />
        <Gantt
          tasks={initialData}
          zoom={zoom}
          onDataUpdated={handleDataUpdate}
        />
        <MessageArea
          messages={messages}
        />
        
      </div>
    </div>
  );
}

export default Schedule;