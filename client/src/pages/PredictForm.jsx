import React, { useState } from "react";
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Typography,
    MenuItem,
} from "@mui/material";
import axios from "axios";

import { cropOptions, soilOptions } from "../data/farmDetails";

export const PredictForm = () => {
    const [formData, setFormData] = useState({
        temperature: "",
        humidity: "",
        moisture: "",
        soilType: "",
        cropType: "",
        nitrogen: "",
        phosphorus: "",
        potassium: "",
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER2_URL, {
                input_data: [
                    parseFloat(formData.temperature),
                    parseFloat(formData.humidity),
                    parseFloat(formData.moisture),
                    formData.soilType,
                    formData.cropType,
                    parseFloat(formData.nitrogen),
                    parseFloat(formData.phosphorus),
                    parseFloat(formData.potassium),
                ],
            });

            setResult(response.data.prediction);
            setOpenDialog(true);
        } catch (error) {
            console.error("Error during prediction:", error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Fertilizer Prediction Form
            </Typography>
            <TextField
                label="Temperature"
                name="temperature"
                type="number"
                fullWidth
                margin="normal"
                value={formData.temperature}
                onChange={handleInputChange}
            />
            <TextField
                label="Humidity"
                name="humidity"
                type="number"
                fullWidth
                margin="normal"
                value={formData.humidity}
                onChange={handleInputChange}
            />
            <TextField
                label="Moisture"
                name="moisture"
                type="number"
                fullWidth
                margin="normal"
                value={formData.moisture}
                onChange={handleInputChange}
            />
            <TextField
                select
                label="Soil Type"
                name="soilType"
                fullWidth
                margin="normal"
                value={formData.soilType}
                onChange={handleInputChange}
            >
                {soilOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                select
                label="Crop Type"
                name="cropType"
                fullWidth
                margin="normal"
                value={formData.cropType}
                onChange={handleInputChange}
            >
                {cropOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Nitrogen"
                name="nitrogen"
                type="number"
                fullWidth
                margin="normal"
                value={formData.nitrogen}
                onChange={handleInputChange}
            />
            <TextField
                label="Phosphorus"
                name="phosphorus"
                type="number"
                fullWidth
                margin="normal"
                value={formData.phosphorus}
                onChange={handleInputChange}
            />
            <TextField
                label="Potassium"
                name="potassium"
                type="number"
                fullWidth
                margin="normal"
                value={formData.potassium}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                sx={{ mt: 2 }}
            >
                Predict Fertilizer
            </Button>

            {/* Result Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Prediction Result</DialogTitle>
                <DialogContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                        Recommended Fertilizer: {result}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
