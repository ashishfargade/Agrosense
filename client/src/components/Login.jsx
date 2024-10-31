import React, { useEffect, useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../features/auth/authSlice.js";

export const Login = ({ handleSignup }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);

    try {

      dispatch(login({email, password}));
      navigate('/dashboard');

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col w-1/2 h-full">
      <div className="pl-5">
        <div className="flex w-full justify-between">
          <h1 className="pt-4 text-3xl font-serif text-gray-700">Login</h1>
          <AiOutlineRollback
            className="w-8 h-8 mr-5 mt-4 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col h-full justify-center">
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label
              className="block text-gray-500 font-bold text-center mb-1 md:mb-0 pr-4"
              htmlFor="inline-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/5">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
              id="inline-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder="abc@gmail.com"
              required
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/5">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
              id="inline-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              placeholder="******************"
              required
            />
          </div>
        </div>

        <div className="flex flex-row justify-center w-full">
          <button
            className="shadow-md bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="flex flex-row justify-center h-min">
          <p
            onClick={ () => handleSignup() }
            className="italic text-green-800 mt-3 cursor-pointer"
          >
            New User? Click here to Signup
          </p>
        </div>
      </form>
    </div>
  );
};