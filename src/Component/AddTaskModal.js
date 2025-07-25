import React, { useContext, useState } from 'react'
import { SidebarContext } from '../Context/sidebarContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchTasks, setStatus } from '../Feature/TaskSlice';

function AddTaskModal() {
    const { showAddModal, setShowAddModal } = useContext(SidebarContext);
    const [disableBtn, setDisableBtn] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        priority: "Normal",
        dueDate: "",
        status: "Pending",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisableBtn(true);
        try {
            console.log("Submitting new task:", formData);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks/addTask`, formData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                }
            });
            if (response.status === 201) {
                dispatch(setStatus("idle"));
                dispatch(fetchTasks());
                toast.success(<div className="text-sm font-medium">Task added successfully!</div>);
                setShowAddModal(false);
                setDisableBtn(false);
            } else {
                toast.error(<div className="text-sm font-medium">{response?.data?.message}</div> || <div className="text-sm font-medium">Failed to add task. Please try again.</div>);
                setDisableBtn(false);
            }
        } catch (error) {
            console.error("Error adding task:", error.message);
            toast.error(<div className="text-sm font-medium">Error adding task. Please try again.</div>);
            setDisableBtn(false);
        }
    };


    return (
        <div>
            {/* Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-rose-50 rounded-xl shadow-2xl p-8 w-full max-w-md border border-rose-100 m-4">
                        <h2 className="text-2xl font-semibold text-rose-800 mb-6 text-center bg-rose-200 p-4 rounded-md shadow-sm">
                            ADD NEW TASK
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Task Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter task name..."
                                    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                                />
                            </div>

                            {/* Priority */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                                >
                                    <option value="High">High</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            {/* Due Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    required
                                    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                                />
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    placeholder="Add any notes about the task..."
                                    className="w-full text-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 text-sm py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={disableBtn}
                                    className="px-5 text-sm py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition shadow"
                                >
                                    Add Task  {disableBtn && <span className='ms-1'><i class="fa fa-spinner fa-spin"></i></span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div >
    )
}

export default AddTaskModal