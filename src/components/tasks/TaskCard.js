const TaskCard = ({ tarea }) => {
    // Determina el color de fondo basado en el estado de la tarea
    const bgClass = tarea.estado === 'Por hacer' ? 'bg-quinary' :
                    tarea.estado === 'En proceso' ? 'bg-quaternary' :
                    tarea.estado === 'En revision' ? 'bg-tertiary' :
                    tarea.estado === 'Finalizado' ? 'bg-secondary' : '';
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{tarea.nombre}</h3>
        <p className={`inline-block text-sm font-medium py-1 px-3 rounded-full ${bgClass}`}>
          {tarea.estado}
        </p>
      </div>
    );
  };
  
  export default TaskCard;
  