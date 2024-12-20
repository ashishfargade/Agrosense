import { useEffect, useState } from "react";
import { Signup } from "../components/Signup";
import { Login } from "../components/Login";
import { useNavigate } from "react-router-dom";

export const LoginSignup = () => {

  const [newUser, setNewUser] = useState(false);

  const handleSignup = () => {
    setNewUser(true);
  }

  const handleLogin = () => {
    setNewUser(false);
  }

  return (
    <div className="w-full h-full absolute bg-gray-200">
      <div className="m-8 h-[90%] flex flex-row border shadow-lg shadow-green-200 bg-white rounded-lg">
        {/* Image on the left */}
        <div className="w-1/2 h-full bg-gradient-to-t from-white via-green-300 to-green-600 rounded-l-lg hidden md:block">
          <img
            src="/images/image-4.jpg"
            className="shadow-lg h-full w-full opacity-50 border-r-2 border-green-950 rounded-l-lg"
          />
        </div>
  
        {
          newUser ? <Signup handleLogin={handleLogin}/> : <Login handleSignup={handleSignup}/>
        }

      </div>
    </div>
  );
};