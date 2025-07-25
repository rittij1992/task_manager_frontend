import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sideMenu, setSideMenu] = useState(0);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [editTaskData, setEditTaskData] = useState({});
    const [overdueTasks, setOverdueTasks] = useState(0);


    return (
        <SidebarContext.Provider value={{ overdueTasks, setOverdueTasks, sideMenu, setSideMenu, showAddModal, setShowAddModal, showSearchModal, setShowSearchModal, editTaskData, setEditTaskData }}>
            {children}
        </SidebarContext.Provider>
    )
}