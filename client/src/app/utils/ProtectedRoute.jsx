import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();  // Correctly call useNavigate as a function

    useEffect(() => {
        if (token === null) {
            navigate("/login");
            console.log("NO USER DATA");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }

    }, []);  // Add dependencies to avoid stale closures

    return <Outlet />;
}