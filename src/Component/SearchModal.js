import React, { useContext, useState } from 'react'
import { SidebarContext } from '../Context/sidebarContext';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/AxiosInstance';

function SearchModal() {
    const { showSearchModal, setShowSearchModal, setEditTaskData } = useContext(SidebarContext);
    const [searchData, setSearchData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const getTaskData = async (query = '') => {
        try {
            const token = localStorage.getItem('token');
            const url = `${process.env.REACT_APP_API_URL}/tasks/allTasks?search=${encodeURIComponent(query)}`;

            const response = await axiosInstance.get(url);
            setSearchData(response.data.tasks);
            if (!response.status === 200) {
                throw new Error('Failed to fetch tasks');
            }
            const tasks = response.data.tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error.message);
        }
    }


     const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.length >= 3) {
            getTaskData(value);
        }
    };


    return (
        <div>
            {
                showSearchModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl border border-gray-200 m-4">
                            <div className="px-4 py-3 border-b border-gray-200 bg-rose-100">
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => handleSearchChange(e)}
                                        placeholder="Search or type a command..."
                                        className="w-full p-2 pl-4 text-sm rounded-md bg-gray-100 outline-none"
                                    />
                                    <kbd onClick={() => setShowSearchModal(false)} className="ml-2 text-xs px-1.5 py-2 border rounded bg-gray-100 text-gray-600 cursor-pointer">Close</kbd>
                                </div>
                            </div>

                            <div className="p-4">
                                
                                <p className="text-xs uppercase text-gray-400 mb-2">Navigation</p>
                                <ul>
                                    {searchData.map((item, index) => (
                                        <li
                                            key={item.index}
                                            onClick={() => {
                                                setShowSearchModal(false);
                                                setEditTaskData(item);
                                                navigate(`/home/edit-task/${item._id}`);
                                            }}
                                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="text-gray-500">🏠</span>
                                                {item.title}
                                            </span>

                                            <span className="flex gap-1 text-sm text-gray-500">
                                                {item.dueDate && new Date(item.dueDate).toLocaleDateString('en-IN')} - {item.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SearchModal