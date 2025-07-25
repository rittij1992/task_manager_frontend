import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarContext } from '../Context/sidebarContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { fetchTasks, setStatus } from '../Feature/TaskSlice';
import { toast } from 'react-toastify';

function TaskCard({ task }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const { setEditTaskData } = useContext(SidebarContext);
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const taskdetails = task;



    // Handle delete task
    const handleDelete = async (e, taskId) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to delete this task?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/deleteTask/${taskId}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": localStorage.getItem("token"),
                        },
                    });
                    if (response.status === 200) {
                        dispatch(setStatus('idle'));
                        dispatch(fetchTasks());
                        Swal.fire("Deleted!", "", "success");
                    } else {
                        Swal.fire("Failed to delete task. Please try again.", "", "info");
                    }
                } catch (error) {
                    console.error("Error deleting task:", error);
                    Swal.fire("Error deleting task. Please try again.", "", "info");
                }
            } else if (result.isDenied) {
                Swal.fire("Task is not deleted", "", "info");
            }
        });
    };



    // Handle status change
    const handleStatusChange = async (e, task) => {
        e.preventDefault();
        setDisableBtn(true);
        const formData = {
            title: task.title,
            priority: task.priority,
            dueDate: task.dueDate,
            status: "Completed",
            description: task.description
        };
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/editTask/${task._id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            if (response.status === 200) {
                dispatch(setStatus('idle'));
                dispatch(fetchTasks());
                toast.success(<div className="text-sm font-medium">Task updated successfully!</div>, {
                    autoClose: 1000,
                });
                setIsMenuOpen(false);
                setDisableBtn(false);
                return;
            } else {
                toast.error(<div className="text-sm font-medium">Failed to update task.</div>);
                setDisableBtn(false);
                return;
            }
        } catch (error) {
            console.error("Error updating task:", error.message);
            toast.error(<div className="text-sm font-medium">Failed to update task.</div>);
            setDisableBtn(false);
            return;
        }
    };




    // Close menu on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);




    return (
        <div className="relative">
            <div className="bg-rose-50 p-6 rounded-lg shadow-md border border-gray-300 group w-80 h-40">
                <div className="flex justify-between items-center w-full">
                    <h3 className="text-base">{taskdetails?.title ? taskdetails?.title : "No Title Privided"}</h3>
                    <span
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-800 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <i className="fa-solid fa-ellipsis"></i>
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm mt-3 font-light">
                    {taskdetails?.description ? taskdetails?.description : "No description provided."}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-1 mt-2 flex-wrap pt-2">
                    <span className="flex items-center gap-1 text-red-500 text-xs">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 12 12"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M9.5 1h-7A1.5 1.5 0 0 0 1 2.5v7A1.5 1.5 0 0 0 2.5 11h7A1.5 1.5 0 0 0 11 9.5v-7A1.5 1.5 0 0 0 9.5 1M2 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zM8.75 8a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0M3.5 4a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p>{taskdetails?.dueDate ? new Date(taskdetails.dueDate).toLocaleDateString('en-IN') : "No date available"}</p>
                    </span>

                    <span className="text-xs ms-2">
                        Priority - <span className={`${taskdetails?.priority === "Low" ? "text-green-500" : taskdetails?.priority === "High" ? "text-red-600" : "text-yellow-400"}`}>{taskdetails?.priority ? taskdetails?.priority : "N/A"}</span>
                    </span>

                    <span className="text-xs ms-2">
                        <span className={`${taskdetails?.status === "Pending" ? "text-red-500" : "text-green-500"} p-1 border border-red-200 rounded-md`}>
                            {taskdetails?.status ? taskdetails?.status : "N/A"}
                        </span>
                    </span>
                </div>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div ref={menuRef} className="absolute right-6 top-6 bg-white border border-gray-300 rounded rounded-lg shadow-md z-10">
                    <ul className="text-sm">
                        <Link to={`/home/edit-task/${task._id}`}><li onClick={() => setEditTaskData(task)} className="px-4 py-2 hover:bg-rose-50 cursor-pointer text-blue-400">Edit</li></Link>
                        <li onClick={(e) => handleDelete(e, task._id)} className="px-4 py-2 hover:bg-rose-50 cursor-pointer text-red-400">Delete</li>
                        <li onClick={(e) => handleStatusChange(e, task)} className="px-4 py-2 hover:bg-rose-50 cursor-pointer text-green-400">Mark as Done {disableBtn && <span className='ms-1'><i class="fa fa-spinner fa-spin"></i></span>}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}


export default TaskCard