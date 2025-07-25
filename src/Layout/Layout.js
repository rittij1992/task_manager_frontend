import React, { useContext } from 'react'
// import Header from '../Component/Header'
import Sidebar from '../Component/Sidebar'
import { SidebarContext } from '../Context/sidebarContext';
import AddTaskModal from '../Component/AddTaskModal';
import WelcomePage from '../Pages/WelcomePage';
import TodayTaskPage from '../Pages/TodayTaskPage';
import OverdueTaskPage from '../Pages/OverdueTaskPage';
import UpcomingTaskPage from '../Pages/UpcomingTaskPage';
import CompletedTaskPage from '../Pages/CompletedTaskPage';
import { Outlet, Route } from 'react-router-dom';
import SearchModal from '../Component/SearchModal';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

function Layout() {
    const { sideMenu, showAddModal, showSearchModal } = useContext(SidebarContext);
    return (
        <div>
            {/* <ToastContainer/> */}
            {/* <Toaster /> */}
            {/* <Header /> */}

            <section>
                <Sidebar />
            </section>

            <section className='w-full h-screen'>
                {showAddModal && <div className='text-2xl text-center mt-20'><AddTaskModal/></div>}
                {showSearchModal && <div className='text-2xl text-center mt-20'><SearchModal/></div>}
                <div className="sm:ml-64">
                    <Outlet />
                </div>
            </section>
        </div>

    )
}

export default Layout