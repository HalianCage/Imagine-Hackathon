const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");

const { fetchWeeklyWeatherData } = require("./services/weatherService");
const { generateDiseaseReport} = require("./services/groqService");
// const cropService = require("./services/cropService");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());


//test route to check if the server is running
app.get("/", (req, res) => {
    console.log("Hello World!");
    res.send("Hello World!");
});





/**
 * API link to - 
 * 1) get the image from the frontend to the backend
 * 2) Make the request to the level 1 ML model for disease prediction through disease.py flask API( which also pushes the disease name & user_id among others, to the database.). Get the disease name back.
 * 3) Make the request to the weather API to get the aggregated weekly weather data, if location access is permitted
 * 4) Pass the disease name and the weather data(if available) to the level 2 ML model, and get the report in required format.
 * 5) Send that report JSON to the front end for displaying 
 */

app.post("/api/crop/save", upload.single("image"), async (req, res) => {
    try {


        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        const imagePath = path.join(__dirname, "uploads", req.file.filename);
        console.log("Image path:", imagePath);

        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));


        
        //Try-catch block to handle errors while calling the disease prediction API
        let diseaseResponse;
        try {
            diseaseResponse = await axios.post("http://127.0.0.1:5000/disease", formData, {
                headers: formData.getHeaders(),
            });
        } catch (error) {
            console.error("Error calling disease prediction API:", error.message);
            return res.status(500).json({ message: "Error predicting disease", error: error.message });
            
        }

        // Check if the response contains the expected data
        if (!diseaseResponse) {
            return res.status(500).json({ message: "Error predicting disease" });
        }

        //variable to store the disease name
        const diseaseName = diseaseResponse.data.prediction

        //debugging line to check the disease name
        console.log("Predicted Disease:", diseaseName);
        


        //variable to store weather data
        let data;

        const language = 'Hindi'


        //capturing the weather data sent from the API fetch. Could be an empty object if location access is not given
        try {
            data = await fetchWeeklyWeatherData()

        } catch (error) {

            console.error("Error fetching weather data:", error);
        }


        //check to data according to whether weather data has been sent or not
        if (!data || Object.keys(data).length === 0) {

            try {

                console.log("No weather data available, generating general report...");

                //function to get the disease report
                const report = await generateDiseaseReport(diseaseName, language);
                console.log(report)

            }
            catch(e) {
                console.log("Some error occured while fetching disease report", e)
            }

        }
        else {

            let weatherData = []

            weatherData.push(data.avgTemp)
            weatherData.push(data.avgHumidity)
            weatherData.push(data.avgSunlight)

            try {

                console.log("Weather data available, generating report with weather data...");

                //function to get the disease report
                const report = await generateDiseaseReport(diseaseName, weatherData, language)
                console.log(report)

            }
            catch(e) {
                console.log('Somme error occured while getting disease report', e)
            }

        }




        //!!!!Edit this to the current variables
        // const savedData = await cropService.saveCropData(
        //     user_id,
        //     avgSunlight,
        //     avgTemp,
        //     avgHumidity,
        //     predictedDisease,
        //     jsonReport
        // );



        //returning response to the frontend, the report acquired from the level 2 ML model
        res.status(201).json({
            report
        });

    } catch (error) {
        console.error("Some unknown error occured while processing data:", error);
        res.status(500).json({
            message: "Error saving data",
            error: error.message,
        });
    }
});

app.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
});
