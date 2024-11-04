// FarmData component
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export const FarmData = ({ farm, onDelete }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {farm.farmName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Area: {farm.area} acres
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Soil Type: {farm.soilType}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Location: {farm.location}
                </Typography>
                {farm.currentCrop && (
                    <Typography variant="body1" color="text.secondary">
                        Current Crop: {farm.currentCrop}
                    </Typography>
                )}
                <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={onDelete} 
                    sx={{ mt: 2 }}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};
