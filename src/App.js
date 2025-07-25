import logo from './logo.svg';
import './App.css';
import Layout from './Layout/Layout';
import { SidebarProvider } from './Context/sidebarContext';
import { ToastContainer } from 'react-toastify';
import { Route, Router, Routes } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import OverdueTaskPage from './Pages/OverdueTaskPage';
import TodayTaskPage from './Pages/TodayTaskPage';
import UpcomingTaskPage from './Pages/UpcomingTaskPage';
import CompletedTaskPage from './Pages/CompletedTaskPage';
import Profile from './Pages/Profile';
import EditTaskPage from './Pages/EditTaskPage';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AuthGuard from './Auth/AuthGuard';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* <Toaster /> */}
      <SidebarProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route element={<AuthGuard />}>
            <Route path="/home" element={<Layout />} >
              <Route index element={<WelcomePage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="overdue" element={<OverdueTaskPage />} />
              <Route path="today" element={<TodayTaskPage />} />
              <Route path="upcoming" element={<UpcomingTaskPage />} />
              <Route path="completed" element={<CompletedTaskPage />} />
              <Route path="edit-task/:id" element={<EditTaskPage />} />
            </Route>
          </Route>

          <Route path='*' element={<div className='text-2xl font-semibold text-center mt-20'>404 Not Found</div>} />
        </Routes>
      </SidebarProvider>
    </div>
  );
}

export default App;
