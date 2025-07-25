import React, { useContext, useState } from 'react'
import { SidebarContext } from '../Context/sidebarContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchTasks } from '../Feature/TaskSlice';
import axiosInstance from '../Api/AxiosInstance';

function EditTaskPage() {
    const { editTaskData } = useContext(SidebarContext);
    const [disableButton, setDisableButton] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: editTaskData?.title || "",
        priority: editTaskData?.priority || "Normal",
        dueDate: editTaskData?.dueDate ? new Date(editTaskData.dueDate).toISOString('en-IN').slice(0, 10) : "",
        status: editTaskData?.status || "Pending",
        description: editTaskData?.description || ""
    });

    const handleEditTask = async (e) => {
        e.preventDefault();
        console.log("Edited Task Data:", formData);
        setDisableButton(true);
        try {
            const response = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/tasks/editTask/${editTaskData._id}`, formData);
            if (response.status === 200) {
                dispatch(fetchTasks());
                toast.success(<div className="text-sm font-medium">Task updated successfully!</div>, {
                    autoClose: 1000,
                });
                navigate('/home');
                setDisableButton(false);
            } else {
                toast.error("Failed to update task.");
                setDisableButton(false);
                return;
            }
        } catch (error) {
            console.error("Error updating task:", error.message);
            toast.error("Failed to update task.");
            setDisableButton(false);
            return;
        }
    };


    return (
        <div className='text-2xl font-semibold mt-20 ms-20'>
            <div className="md:p-10 min-h-screen">
                <div className='text-start'>
                    <h1>Edit Task</h1>
                    <div className='flex items-center gap-1 mt-4 text-gray-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16m-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708" clip-rule="evenodd"></path></svg>
                        <span className='text-base font-normal'>{editTaskData?.title}</span>
                    </div>
                </div>


                <div className='max-w-2xl text-sm mt-10 p-6 bg-rose-50 rounded-lg shadow-md me-5'>
                    <form className='mt-6' onSubmit={handleEditTask}>
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 mb-2" htmlFor="taskName">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    id="taskName"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Enter task name"
                                    defaultValue={editTaskData?.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority
                                </label>
                                <select
                                    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                                    defaultValue={editTaskData?.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                >
                                    <option value="High">High</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>


                        <div className="mb-4 flex items-center gap-4">
                            <div className='flex-1'>
                                <label className="block text-gray-700 mb-2" htmlFor="dueDate">Due Date</label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    placeholder="Select due date"
                                    defaultValue={editTaskData?.dueDate ? new Date(editTaskData.dueDate).toISOString('en-IN').slice(0, 10) : ''}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                />
                            </div>

                            <div className="flex-1">
                                <label className="block text-gray-700 mb-2" htmlFor="taskStatus">Status</label>
                                <select
                                    id="taskStatus"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    defaultValue={editTaskData?.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <label className='block text-gray-700 mb-2' htmlFor='taskDescription'>Description</label>
                            <textarea defaultValue={editTaskData?.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} id='taskDescription' className='w-full p-2 border border-gray-300 rounded' placeholder='Enter task description'></textarea>
                        </div>
                        <button type='submit' className="px-5 text-sm py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition shadow">Save Changes</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default EditTaskPage