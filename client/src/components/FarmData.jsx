import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

import axios from "../app/api/axios";

export const FarmData = ({ farm, onDelete }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [openWeatherDialog, setOpenWeatherDialog] = useState(false);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`/weather/getweather`, {
                params: {
                    pincode: farm.pincode,
                },
                headers: {
                    'x-auth-token': sessionStorage.getItem('token'),
                }
            });

            setWeatherData(response.data);
            setOpenWeatherDialog(true);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleCloseWeatherDialog = () => {
        setOpenWeatherDialog(false);
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3, position: "relative" }}>
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
                <Typography variant="body1" color="text.secondary">
                    Pincode: {farm.pincode}
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

            {/* "Get Weather" Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={fetchWeather}
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            >
                Get Weather
            </Button>

            {/* Weather Dialog */}
            <Dialog open={openWeatherDialog} onClose={handleCloseWeatherDialog}>
                <DialogTitle>Weather Information</DialogTitle>
                <DialogContent>
                    {weatherData ? (
                        <>
                            <Typography variant="body1">
                                <strong>Temperature:</strong> {weatherData.Temperature.Metric.Value} °C
                            </Typography>
                            <Typography variant="body1">
                                <strong>Condition:</strong> {weatherData.WeatherText}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Precipitation:</strong> {weatherData.PrecipitationSummary.Precipitation.Metric.Value} mm
                            </Typography>
                            <Typography variant="body1">
                                <strong>Humidity:</strong> {weatherData.RelativeHumidity} %
                            </Typography>
                            <Typography variant="body1">
                                <strong>Wind:</strong> {weatherData.Wind.Speed.Metric.Value} km/h
                            </Typography>
                        </>
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseWeatherDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};
