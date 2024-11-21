import React, { useState, useEffect } from "react";
import { Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const DiseaseForm = () => {
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [response, setResponse] = useState("");
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        if (user && user.farms) {
            setFarms(user.farms);
        }
    }, [user]);

    const handleFarmSelect = (event) => {
        const farmId = event.target.value;
        const selectedFarm = farms.find(farm => farm._id === farmId);
        setSelectedFarm(selectedFarm);
    };

    const handleSubmit = async () => {
        if (!selectedFarm) return;

        setLoading(true);

        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
      Given the crop type ${selectedFarm.currentCrop} with the following conditions:
      - Soil Type: ${selectedFarm.soilType}
      - Farm Location: ${selectedFarm.location}
      - Farm Area: ${selectedFarm.area} acres.
      List potential diseases affecting this crop and its fertilizers with name and brands also expected quantity and expected price.
    `;

        try {
            const result = await model.generateContent(prompt);
            const formattedResponse = result.response.text();

            let formattedHtmlResponse = formattedResponse
                .replace(/\*\s\*\*(.*?)\*\*:/gm, (match, p1) => {
                    return `<ul class="list-disc pl-5"><li><strong class="font-bold">${p1}:</strong></li></ul>`;
                })
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                .replace(/^\*\s\*\*(.*?)\*\*/gm, (match, p1) => {
                    const listItemNumber = match.split(' ')[0].replace('*', '');
                    return `<ol class="list-decimal pl-5"><li><strong class="font-bold">${p1}</strong></li></ol>`;
                })
                .replace(/## (.*?)\n/g, '<h2 class="text-xl font-semibold text-gray-800">$1</h2>')
                .replace(/\n/g, '<br />');

            setResponse(formattedHtmlResponse);
        } catch (error) {
            console.error("Error generating response:", error);
            setResponse("Error generating disease prediction.");
        }

        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Disease Recommendation</h2>

            <div className="mb-4">
                <FormControl fullWidth margin="normal">
                    <InputLabel>Select a Farm</InputLabel>
                    <Select
                        value={selectedFarm ? selectedFarm._id : ""}
                        onChange={handleFarmSelect}
                        label="Select a Farm"
                        className="border border-gray-300 rounded-md p-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                        {farms.map(farm => (
                            <MenuItem key={farm._id} value={farm._id} className="text-gray-700">
                                {farm.farmName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {selectedFarm && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold text-gray-800">Farm Details:</p>
                    <p><span className="font-medium">Farm Name:</span> {selectedFarm.farmName}</p>
                    <p><span className="font-medium">Location:</span> {selectedFarm.location}</p>
                    <p><span className="font-medium">Soil Type:</span> {selectedFarm.soilType}</p>
                    <p><span className="font-medium">Area:</span> {selectedFarm.area} acres</p>
                    <p><span className="font-medium">Current Crop:</span> {selectedFarm.currentCrop}</p>
                </div>
            )}

            <div className="flex justify-center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading || !selectedFarm}
                    className="w-1/2 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading ? "Loading..." : "Get Disease Prediction"}
                </Button>
            </div>

            {response && (
                <div
                    className="mt-6 p-4 bg-green-50 rounded-lg shadow-sm"
                    dangerouslySetInnerHTML={{ __html: response }}
                />
            )}
        </div>
    );
};

export default DiseaseForm;
