import React, { useContext, useEffect, useState } from 'react'
import arrorw from '../Assets/arrow-down-sign-to-navigate.png'
import rittij from '../Assets/profilepic.png'
import { SidebarContext } from '../Context/sidebarContext';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../Feature/TaskSlice';


function Sidebar() {
    const { sideMenu, setSideMenu } = useContext(SidebarContext);
    const { setShowAddModal, setShowSearchModal } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.tasks);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const overdueTasks = items.filter(task => {
        if (!task.dueDate || task.status === 'Completed') return false;

        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0); // Normalize due date

        return dueDate < today;
    });

    const currentDay = new Date().getDate();



    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>


            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen bg-rose-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-rose-50 ">
                    {/* <a href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                    </a> */}

                    <Link to={"/home/profile"} className='flex items-between justify-between mb-4'>
                        <div className="flex items-center space-x-3 p-1 mb-4 rounded-md hover:shadow-md cursor-pointer hover:bg-gray-200 w-fit">
                            {/* Profile Picture */}
                            <img
                                src={rittij}
                                alt="Profile"
                                className="w-7 h-7 rounded-full object-cover"
                            />
                            {/* User Name */}
                            <span className="text-sm flex items-center font-medium text-gray-800">Rittij
                                {/* <img className='w-2 h-2 ms-2' src={arrorw}></img> */}
                            </span>
                        </div>

                        <div className="flex items-center space-x-3 p-1 mb-4">
                            <svg className='rounded-md hover:shadow-md cursor-pointer hover:bg-gray-200 w-fit p-0.5' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887m10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5s-2.8.656-3.618 1.883c-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723q-.11.12-.232.261c-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557q-.122-.141-.232-.261c-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884M14 17.5h-4a2 2 0 1 0 4 0" clip-rule="evenodd"></path></svg>
                            <Link to={'/home'} className="p-1 text-sm font-medium text-gray-800 rounded-md hover:shadow-md cursor-pointer hover:bg-gray-200 w-fit"><i class="fa-regular fa-house"></i></Link>
                        </div>
                    </Link>



                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link onClick={() => { setShowAddModal(true); setIsOpen(false) }} className={`hover:bg-gray-200 text-gray-800 dark:hover:bg-gray-700 cursor-pointer flex items-center p-2 text-red-800 rounded-lg dark:text-white group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789z" clip-rule="evenodd"></path></svg>
                                <span className="ms-3">Add Task</span>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => { setShowSearchModal(true); setIsOpen(false) }} className={`${sideMenu === 1 ? "bg-red-100 text-red-800" : "hover:bg-gray-200 text-gray-800 dark:hover:bg-gray-700"} cursor-pointer flex items-center p-2 rounded-lg dark:text-white group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707zM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12" clip-rule="evenodd"></path></svg>
                                <span className="font-thin flex-1 ms-3 whitespace-nowrap">Search</span>
                                {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                            </Link>
                        </li>
                        <li>
                            <Link to={"/home/overdue"} onClick={() => { setIsOpen(false); setSideMenu(2) }} className={`${sideMenu === 2 ? "bg-red-100 text-red-800" : "hover:bg-gray-200 dark:hover:bg-gray-700"} cursor-pointer flex items-center p-2 rounded-lg dark:text-white group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246q.06.24.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4m0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a1 1 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1z" clip-rule="evenodd"></path></svg>
                                <span className="font-thin flex-1 ms-3 whitespace-nowrap">Overdue</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-red-800 bg-red-200 rounded-full dark:bg-blue-900 dark:text-blue-300">{overdueTasks.length}</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/home/today"} onClick={() => { setIsOpen(false); setSideMenu(3) }} className={`${sideMenu === 3 ? "bg-red-100 text-red-800" : "hover:bg-gray-200 dark:hover:bg-gray-700"} cursor-pointer flex items-center p-2 rounded-lg dark:text-white group`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><g fill="currentColor" fill-rule="evenodd"><path fill-rule="nonzero" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"></path><text font-family="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'" font-size="9" transform="translate(4 2)" font-weight="500"><tspan x="8" y="15" text-anchor="middle">{currentDay}</tspan></text></g></svg>
                                <span className="font-thin flex-1 ms-3 whitespace-nowrap">Today</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/home/upcoming"} onClick={() => { setIsOpen(false); setSideMenu(4) }} className={`${sideMenu === 4 ? "bg-red-100 text-red-800" : "hover:bg-gray-200 dark:hover:bg-gray-700"} cursor-pointer flex items-center p-2 rounded-lg dark:text-white group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1z" clip-rule="evenodd"></path></svg>
                                <span className="font-thin flex-1 ms-3 whitespace-nowrap">Upcoming</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/home/completed"} onClick={() => { setIsOpen(false); setSideMenu(5) }} className={`${sideMenu === 5 ? "bg-red-100 text-red-800" : "hover:bg-gray-200 dark:hover:bg-gray-700"} cursor-pointer flex items-center p-2 rounded-lg dark:text-white group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16m-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708" clip-rule="evenodd"></path></svg>
                                <span className="font-thin flex-1 ms-3 whitespace-nowrap">Completed</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="#" className="flex items-center p-2 text-red-800 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </Link>
                        </li> */}
                        {/* <li>
                            <a href="#" className="flex items-center p-2 text-red-800 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group">
                                <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                            </a>
                        </li> */}
                    </ul>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar