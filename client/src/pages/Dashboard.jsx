import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
import { Farms } from "../components/Farms";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";

export const Dashboard = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleFertClick = () => {
        console.log("Go to fert rec");
        navigate("/fertpredict");
    };

    const handleDiseaseClick = () => {
        console.log("Go to disease rec");
        navigate("/diseasepredict");
    }

    const userLogout = () => {
      console.log(logout);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      navigate('/login');
      dispatch(dispatch(logout()));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                backgroundColor: "#f4f6f8",
            }}
        >
            <AppBar position="static" sx={{ backgroundColor: "#212121" }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>

                    <div className="mx-4" >
                        <Button 
                            variant="outlined"
                            color="white"
                            onClick={handleDiseaseClick}
                        >
                            <Typography variant="subtitle1">Get Disease Prediction</Typography>
                        </Button>
                    </div>
                    

                    <Button
                        variant="outlined"
                        color="white"
                        onClick={handleFertClick}
                    >
                        <Typography variant="subtitle1">Get Fertilizer Recommendation</Typography>
                    </Button>
                    <Typography variant="title" color="inherit" noWrap>
                        &nbsp; &nbsp; &nbsp; &nbsp; 
                    </Typography>
                    <Button onClick={userLogout}><Typography variant="button" color="white">Logout</Typography></Button>
                    
                </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Hello, {user?.name}
                </Typography>
                <Farms />
            </Box>
        </Box>
    );
};
