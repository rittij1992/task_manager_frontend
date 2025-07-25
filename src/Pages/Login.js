import React, { use, useState } from 'react'
import image from '../Assets/LoginSignup/signin-image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import axiosInstance from '../Api/AxiosInstance';

function Login() {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setDisableBtn(true);

        if (emailId === "" || password === "") {
            toast.error("Please fill all the fields");
            setDisableBtn(false);
            return;
        }

        const user = {
            email_id: emailId,
            password: password
        };

        try {
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_API_URL}/users/login`,
                user
            );

            // Axios stores response data in response.data
            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Login successful");
            navigate("/home");
            setDisableBtn(false);

        } catch (error) {
            // Handle different error cases
            if (error.response) {
                toast.error(error.response.data.message || "Login failed. Please try again.");
            } else {
                toast.error("Login failed. Please try again.");
            }
            console.error("Login error:", error);
            setDisableBtn(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50">
            <ToastContainer />
            <div className="bg-white rounded-2xl shadow-lg p-10 flex w-[90%] max-w-5xl">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 pr-6">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Login</h2>
                    <form className="space-y-5" onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-600 mr-3">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full focus:outline-none"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </div>
                        {/* Password */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-600 mr-3">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full focus:outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1" />
                            <label className="text-sm text-gray-600">
                                Remember me
                            </label>
                        </div>
                        {/* Register Button */}
                        <button
                            type="submit"
                            className="bg-rose-400 text-white py-2 px-6 rounded-md hover:bg-red-500 transition"
                            disabled={disableBtn}
                        >
                            Login {disableBtn && <span className='ms-1'><i class="fa fa-spinner fa-spin"></i></span>}
                        </button>
                    </form>
                    <div className='mt-10'>
                        <p className="mt-4 text-sm">
                            <Link to={'/signup'} className="text-gray-800 underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="hidden md:flex items-center justify-center w-1/2">
                    <div className="text-center">
                        <img
                            src={image}
                            alt="signup"
                            className="w-[300px] object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;