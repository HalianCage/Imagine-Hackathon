const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const weatherService = require("./services/weatherService");
const cropService = require("./services/cropService");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log("Hello World!");
    res.send("Hello World!");
});

app.post("/api/crop/save", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const imagePath = path.join(__dirname, "uploads", req.file.filename);
        console.log("Image path:", imagePath);

        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));

        const diseaseResponse = await axios.post("http://127.0.0.1:5000/disease", formData, {
            headers: formData.getHeaders(),
        });

        console.log("Flask disease prediction:", diseaseResponse.data);

        const jsonData = JSON.parse(req.body.data);
        const { user_id, plant_stage, water_required, fertilizer_type } = jsonData;

        const Plant_Stage = plant_stage === "adult" ? 2 : plant_stage === "seedling" ? 0 : 1;
        const Fertilizer_Type = fertilizer_type === "organic" ? 1 : fertilizer_type === "chemical" ? 2 : 0;

        const { avgTemp, avgHumidity, avgSunlight } = await weatherService.fetchWeeklyWeatherData();
        const inputData = [Plant_Stage, water_required, avgSunlight, avgTemp, avgHumidity, Fertilizer_Type];

        const modelResponse = await axios.post("http://127.0.0.1:5000/predict", {
            input: inputData,
        });

        const prediction = modelResponse.data.prediction;

        const savedData = await cropService.saveCropData(
            user_id,
            plant_stage,
            avgSunlight,
            avgTemp,
            avgHumidity,
            water_required,
            fertilizer_type,
            prediction
        );

        res.status(201).json({
            message: "Crop data processed and saved successfully",
            disease: diseaseResponse.data.prediction,
            prediction,
            data: savedData,
        });
    } catch (error) {
        console.error("Error processing crop data:", error);
        res.status(500).json({
            message: "Error saving data",
            error: error.message,
        });
    }
});

app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
