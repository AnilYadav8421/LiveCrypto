import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Login = () => {
    const [darkMode, setDarkMode] = useState(true);

    const navigate = useNavigate();

    const handleLogin = () => {

        // Fake Login
        localStorage.setItem("isLoggedIn", "true");

        navigate("/");
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-[#282D2D] px-5">

            <Logo />
            {/* Dark Mode Toggle */}
            <div className="flex flex-col items-end justify-start overflow-hidden mb-2 xl:max-w-3xl w-full">
                {/* <div className="flex items-center">
                    <h3 className="text-white">Dark Mode : &nbsp;</h3>

                    <label className="inline-flex relative items-center mr-5 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            readOnly
                        />

                        <div
                            onClick={() => setDarkMode(!darkMode)}
                            className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                        ></div>
                    </label>
                </div> */}
            </div>

            {/* Login Card */}
            <div
                className={`xl:max-w-3xl w-full p-5 sm:p-10 rounded-md ${darkMode ? "bg-black" : "bg-white"
                    }`}
            >
                <h1
                    className={`text-center text-xl sm:text-3xl font-semibold ${darkMode ? "text-white" : "text-black"
                        }`}
                >
                    Login to your account
                </h1>

                <div className="w-full mt-8">
                    <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">

                        {/* Email */}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${darkMode
                                ? "bg-[#302E30] text-white focus:border-cyan-400"
                                : "bg-gray-100 text-black focus:border-black"
                                }`}
                            type="email"
                            placeholder="Enter your email"
                        />

                        {/* Password */}
                        <input
                            className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${darkMode
                                ? "bg-[#302E30] text-white focus:border-cyan-400"
                                : "bg-gray-100 text-black focus:border-black"
                                }`}
                            type="password"
                            placeholder="Password"
                        />

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            className="mt-5 tracking-wide font-semibold bg-cyan-500 text-gray-100 w-full py-4 rounded-lg hover:bg-cyan-400 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6 -ml-2"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                            </svg>

                            <span className="ml-3">Login</span>
                        </button>

                        {/* Register Link */}
                        <p className="mt-6 text-xs text-gray-600 text-center">
                            Don&apos;t have an account?{" "}

                            <Link to="/register">
                                <span className="text-cyan-500 font-semibold">
                                    Register
                                </span>
                            </Link>
                            <span className="text-white"> / </span>
                            <Link to="/home">
                                <span className="text-cyan-500 font-semibold">
                                    Continue as Guest
                                </span>
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;