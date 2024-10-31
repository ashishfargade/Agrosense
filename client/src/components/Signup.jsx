import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { signup } from "../features/auth/authSlice.js";
import { country_list } from "../data/countryList";

export const Signup = ({ handleLogin }) => {
    const countries = country_list;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: null,
        email: null,
        password: null,
    });

    const [requestStatus, setRequestStatus] = useState("idle");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        if (requestStatus === "idle") {
            try {
                setRequestStatus("pending");
                dispatch(signup(user)).unwrap();
                navigate('/dashboard');

            } catch (err) {
                console.log(err);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    return (
        <div className="flex flex-col w-1/2 h-full px-5">
            <div className="flex w-full justify-between">
                <h1 className="pt-4 text-3xl font-serif text-gray-700">
                    Sign Up
                </h1>
                <AiOutlineRollback
                    className="w-8 h-8 mt-4 cursor-pointer"
                    onClick={() => {
                        navigate("/");
                    }}
                />
            </div>
            <div className="flex flex-col w-full h-full justify-evenly lg:pr-9">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="flex items-center w-full mb-6">
                        <div className="w-1/3">
                            <label
                                className="block text-center text-gray-500 font-bold mb-1 pr-4"
                                htmlFor="inline-fullName"
                            >
                                Full Name
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                id="inline-fullName"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center w-full mb-6">
                        <div className="w-1/3">
                            <label
                                className="block text-center text-gray-500 font-bold mb-1 pr-4"
                                htmlFor="inline-email"
                            >
                                Email
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                id="inline-email"
                                name="email"
                                type="email"
                                placeholder="abc@gmail.com"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center w-full mb-6">
                        <div className="w-1/3">
                            <label
                                className="block text-center text-gray-500 font-bold mb-1 pr-4"
                                htmlFor="inline-password"
                            >
                                Set Password
                            </label>
                        </div>
                        <div className="w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                id="inline-password"
                                name="password"
                                type="password"
                                placeholder="********"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        <div className="flex items-center w-1/2 mb-6 pr-4">
                            <div className="w-2/5">
                                <label
                                    className="block text-center text-gray-500 font-bold mb-1"
                                    htmlFor="inline-country"
                                >
                                    Country
                                </label>
                            </div>
                            <div className="w-3/5">
                                <select
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                    id="inline-country"
                                    name="country"
                                    onChange={handleChange}
                                    defaultValue={"India"}
                                >
                                    {countries.map((country, id) => (
                                        <option key={id}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center w-1/2 mb-6">
                            <div className="w-1/3">
                                <label
                                    className="block text-center text-gray-500 font-bold mb-1"
                                    htmlFor="inline-zip"
                                >
                                    Zip Code
                                </label>
                            </div>
                            <div className="w-2/3">
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                    id="inline-zip"
                                    name="zip"
                                    onChange={handleChange}
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-2">
                        <button
                            className="bg-green-900 px-4 py-1 rounded-md text-white shadow-md shadow-gray-500"
                            type="submit"
                        >
                            Signup
                        </button>
                    </div>
                    <div className="flex flex-row justify-center h-min">
                        <p
                            onClick={handleLogin}
                            className="italic text-green-800 mt-3 cursor-pointer"
                        >
                            Already Signed Up? Login Here
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
