import React from 'react'
import rittij from '../Assets/profilepic.png'
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../Feature/TaskSlice';
import Swal from 'sweetalert2';

function Profile() {
  const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.tasks);
    const userData = JSON.parse(localStorage.getItem("user")) ;

  const handleLogout = () => {
    dispatch(setStatus("idle"));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handlePassChange = () => {
    Swal.fire({
      title: 'Change Password Feature Coming Soon!',
      text: 'This feature is under development. Please check back later.',
      icon: 'info',
      confirmButtonText: 'OK',
    })
  }


  const user = {
    name: userData?.name,
    email: userData?.email,
    phone: "+91 9870000210",
    role: "User",
    joined: "July 2025",
    profileImg: "https://i.pravatar.cc/150?img=3", // Replace with actual profile image URL
  };
  return (
    <div className="text-2xl font-semibold">
      <div className="p-6 md:p-10 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 bg-rose-50 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-700">Profile</h1>
          </div>

          {/* Profile Section */}
          <div className="px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Picture */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md">
                <img
                  src={rittij}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-500 mb-4">{user.role}</p>

                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Joined:</strong> {user.joined}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-4">
            {/* <button className="px-5 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-sm shadow">
              Edit Profile
            </button> */}
            <button onClick={() => handlePassChange()} className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 text-sm">
              Change Password
            </button>
            <button onClick={() => handleLogout()} className="flex items-center px-5 py-2 rounded-md bg-rose-700 text-white hover:bg-red-800 text-sm shadow">
              <svg className="me-2 shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;