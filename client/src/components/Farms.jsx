// Farms component
import React, { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { FarmData } from "./FarmData.jsx";
import axios from "../app/api/axios";

export const Farms = () => {
    const token = sessionStorage.getItem("token");
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    const [farms, setFarms] = useState([]);
    const [open, setOpen] = useState(false);
    const [newFarm, setNewFarm] = useState({
        farmName: "",
        area: "",
        soilType: "",
        location: "",
        pincode: "",
        currentCrop: "",
    });

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const response = await axios.get("/farm/allfarms", {
                    headers: {
                        "x-auth-token": token,
                    },
                });

                setFarms(response.data);
                storedUser.farms = response.data;

                sessionStorage.setItem("user", JSON.stringify(storedUser));

                console.log("FARM FETCH SUCCESS");
            } catch (error) {
                console.error("Error fetching farms:", error);
            }
        };
        fetchFarms();
    }, [open, token]); // `token` in dependencies ensures it's up-to-date

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFarm({ ...newFarm, [name]: value });
    };

    const handleAddFarm = async () => {
        try {
            const response = await axios.put("/farm/new", newFarm, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": token,
                },
            });

            console.log("Farm added:", response.data);

            setFarms([...farms, response.data]);

            storedUser.farms.push(response.data);
            sessionStorage.setItem("user", JSON.stringify(storedUser));

            handleClose();
        } catch (error) {
            console.error("Error adding farm:", error);
        }
    };

    const handleDeleteFarm = async (farmId) => {
        try {
            await axios.delete(`/farm/delete/${farmId}`, {
                headers: {
                    "x-auth-token": token,
                },
            });
            
            setFarms(farms.filter((farm) => farm._id !== farmId));

            console.log("Farm deleted:", farmId);
        } catch (error) {
            console.error("Error deleting farm:", error);
        }
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4" component="h1">
                    Farm Data
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleOpen}
                >
                    Add Farm
                </Button>
            </Box>
            <Grid container spacing={3}>
                {farms.map((farm) => (
                    <Grid item xs={12} sm={6} md={4} key={farm._id}>
                        <FarmData farm={farm} onDelete={() => handleDeleteFarm(farm._id)} />
                    </Grid>
                ))}
            </Grid>

            {/* Add Farm Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Farm</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="farmName"
                        label="Farm Name"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="area"
                        type="number"
                        label="Area (in acres)"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="soilType"
                        label="Soil Type"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="location"
                        label="Location"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="pincode"
                        label="Pincode"
                        fullWidth
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="currentCrop"
                        label="Current Crop"
                        fullWidth
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddFarm} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
