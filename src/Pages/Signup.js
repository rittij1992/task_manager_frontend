import React, { useEffect, useState } from 'react'
import image from '../Assets/LoginSignup/signup-image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import axiosInstance from '../Api/AxiosInstance';

function Signup() {
    const [name, setName] = useState("");
    const [email_id, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const navigate = useNavigate();




    const handleSignup = async (e) => {
        e.preventDefault();
        setDisableBtn(true);

        if (name === "" || email_id === "" || password === "" || repeatPassword === "") {
            toast.error("Please fill all the fields");
            setDisableBtn(false);
            return;
        }

        if (password !== repeatPassword) {
            toast.error("Passwords do not match");
            setDisableBtn(false);
            return;
        }

        const user = {
            name: name,
            email_id: email_id,
            password: password,
        };

        try {
            const response = await axiosInstance.post(
                `${process.env.REACT_APP_API_URL}/users/register`,
                user
            );

            if (response.status === 201) {
                toast.success("Signup successful");
                setDisableBtn(false);
                setTimeout(() => {
                    navigate("/");
                }, 800);
            }
        } catch (error) {
            if (error.response && error.response.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Signup failed. Please try again.");
            }
            console.error("Signup failed:", error);
            setDisableBtn(false);
        }
    };


    const validatePassword = (value) => {
        setPassword(value);
        const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
        if (value) {
            const isValid = passwordRegex.test(value);
            setIsValidPassword(isValid);
        }
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-rose-50">
            <ToastContainer />
            <div className="bg-white rounded-2xl shadow-lg p-10 flex w-[90%] max-w-5xl">
                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 pr-6">
                    <h2 className="text-4xl font-bold mb-6 text-gray-900">Sign up</h2>
                    <form className="space-y-5" onSubmit={handleSignup}>
                        {/* Name */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-600 mr-3">
                                <i className="fas fa-user"></i>
                            </span>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full focus:outline-none"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                                onChange={(e) => validatePassword(e.target.value)}
                            />
                        </div>
                        {!isValidPassword && (
                            <span className='text-sm text-red-400'>**Password should be atleast 8 alphanumeric characters.</span>
                        )}

                        {/* Repeat Password */}
                        <div className="flex items-center border-b border-gray-300 py-2">
                            <span className="text-gray-600 mr-3">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                type="password"
                                placeholder="Repeat your password"
                                className="w-full focus:outline-none"
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                        </div>
                        {/* Checkbox */}
                        <div className="flex items-start">
                            <input type="checkbox" className="mr-2 mt-1" />
                            <label className="text-sm text-gray-600">
                                I agree all statements in{' '}
                                <a href="#" className="text-blue-600 underline">
                                    Terms of service
                                </a>
                            </label>
                        </div>
                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={disableBtn}
                            className="bg-rose-400 text-white py-2 px-6 rounded-md hover:bg-red-500 transition"
                        >
                            Register {disableBtn && <span className='ms-1'><i class="fa fa-spinner fa-spin"></i></span>}
                        </button>
                    </form>
                    <p className="mt-4 text-sm">
                        <Link to={'/'} className="text-gray-800 underline">
                            I am already member
                        </Link>
                    </p>
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

export default Signup