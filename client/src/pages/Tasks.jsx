import React from "react";
import { useIsAuth } from "@/hooks/useIsAuth";
import TaskList from "@/components/Task/TaskList";

const Tasks = () => {
  useIsAuth()
  return (  
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 relative overflow-auto bg-gray-50 ">
        <div className=' flex  justify-between '>
          <h1 className='p-2 text-xl font-light '>Task List </h1>
        </div>
        <TaskList/> 
      </main>
    </div>
  );
};

export default Tasks;