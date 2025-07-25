import React, { useContext, useEffect, useState } from 'react'
import { SidebarContext } from '../Context/sidebarContext';
import TaskCard from '../Component/TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../Feature/TaskSlice';

function UpcomingTaskPage() {
    const { setShowAddModal } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false);
    const { items, status } = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTasks = items.filter(task => {
        if (!task.dueDate || task.status === 'Completed') return false;

        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0); // Normalize due date

        return dueDate > today;
    });

        useEffect(() => {
            if (status === 'idle' || status === 'failed') {
                dispatch(fetchTasks());
            }
        }, [status, dispatch]);

    return (
        <div className='text-2xl font-semibold mt-20 ms-20'>
            <div className='text-start'>
                <h1>Upcoming</h1>
                <div className='flex items-center gap-1 mt-4 text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16m-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708" clip-rule="evenodd"></path></svg>
                    <span className='text-sm font-normal'>{upcomingTasks.length} Tasks</span>
                </div>
            </div>



            <div className='mt-10 flex gap-4 justify-start items-center flex-wrap'>
                {
                    upcomingTasks.length > 0 ? upcomingTasks.map((task, index) => (
                        <TaskCard key={index} task={task} />
                    )) : (
                        <div className='text-gray-500'>No upcoming tasks available</div>
                    )
                }


                <div className='w-40'>
                    <a onClick={() => { setShowAddModal(true); setIsOpen(false) }} className={`hover:bg-gray-200 text-gray-800 dark:hover:bg-gray-700 cursor-pointer flex items-center p-2 text-red-800 rounded-lg dark:text-white group`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789z" clip-rule="evenodd"></path></svg>
                        <span className="text-base ms-2">Add Task</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UpcomingTaskPage