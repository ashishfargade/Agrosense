import { useSelector } from "react-redux"
import { selectUser } from "../../features/auth/authSlice";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute() {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate("/login");
            console.log("NO USER DATA");
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
        }

    }, []);  // Add dependencies to avoid stale closures

    return <Outlet />;
}