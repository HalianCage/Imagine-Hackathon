const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const pool = require('./config/db')

const { fetchWeeklyWeatherData } = require("./services/weatherService");
const { generateDiseaseReport} = require("./services/groqService");
const { loadEnvFile, report } = require("process");
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

        //variable to store the request row ID in the database
        let id;

        //test user ID. In prod, we will user_id from frontend, and would be having user login registration with user sessions
        const user_id = 1

         //variable to store weather data
        let data;

        //variable to store the report
        let report;

        //getting the language and location data from the request body
        const language = req.body.language
        const location = JSON.parse(req.body.location)
        console.log('checking the passed language and location values\n')
        console.log(language)
        console.log(location)



        //if block to check if language parameter has been passed or to default to english
        if(!language) {

            console.log("no language received, defaulting to English")
            language = 'English'
        }
        

        //check if image has been passed or not
        if (!req.file) {
            return res.status(400).json({ message: "No image file uploaded" });
        }

        
        const imagePath = path.join(__dirname, "uploads", req.file.filename);
        console.log("Image path:", imagePath);

        const formData = new FormData();
        formData.append("image", fs.createReadStream(imagePath));
        console.log("ImagePath: ", imagePath)
        console.log("formData: ", formData)


        
        //Try-catch block to handle errors while calling the disease prediction API
        let diseaseResponse;
        try {
            diseaseResponse = await axios.post("http://localhost:5000/disease", formData, {
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


        //creating database client
        const client = await pool.connect()
        

        //pushing predicted disease to the database
        try {
            
            await client.query("BEGIN")

            const formsQueryResult = await client.query(`INSERT INTO record_table(user_id, disease_name) VALUES ($1, $2) RETURNING id`, [user_id, diseaseName])

            id = formsQueryResult.rows[0].id

            await client.query("COMMIT")

            console.log('disease name insert wuery successful. returned row id: ', id)


        } catch (error) {
            
            console.log("Some error occured while inserting disease name. Please again", error)
            await client.query("ROLLBACK")
            return res.status(500).json({ message: "Some error occured while saving the data. Please try again" });
        }
        



        //if-else block to fetch weather data only if location has been passed
        if(!location) {

            console.log("No location has been passed from frontend to backend")
            
        }
        else {
            data = await fetchWeeklyWeatherData(location.latitude, location.longitude)

            
            console.log("Pushing weather data to the database")

            
            //pushing the weather data to the database row of same id
            try {
                
                await client.query("BEGIN")

                const formsQueryResult = await client.query(`UPDATE record_table SET avgWeeklyTemp = $1, avgWeeklyHumidity = $2, avgWeeklySunlight = $3 WHERE id = $4`, [parseInt(data.avgTemp), parseInt(data.avgHumidity), parseInt(data.avgSunlight), id])

                await client.query("COMMIT")

                console.log('successfully stored the weather values to the database')

            } catch (error) {
                
                console.log("Some error occured while inserting weather data. Please try again", error)
                await client.query("ROLLBACK")
                return res.status(500).json({ message: "Some error occured while saving the data. Please try again" });
            }
        }


        //check to data according to whether weather data has been sent or not
        if (!data || Object.keys(data).length === 0) {

            try {

                console.log("No weather data available, generating general report...");

                //function to get the disease report
                report = await generateDiseaseReport(diseaseName, language);
                console.log(report)

            }
            catch(e) {
                console.log("Some error occured while generating disease report", e)
                return res.status(500).json({ message: "Could not generate report. Please try again", error: error.message });
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
                report = await generateDiseaseReport(diseaseName, weatherData, language)
                console.log(report)

            }
            catch(e) {
                console.log('Somme error occured while getting disease report using the weather data.', e)
                return res.status(500).json({ message: "Could not generate report using the weather data. Please try again", error: error.message });
            }

        }


        //pushing the generated report to the database
        try {
                
                await client.query("BEGIN")

                const formsQueryResult = await client.query(`UPDATE record_table SET language = $1, report = $2 WHERE id = $3`, [language, report, id])


                console.log('report & language data push : \n', formsQueryResult)

                await client.query("COMMIT")

                console.log('successfully stored the languages and report to the database')

            } catch (error) {
                
                console.log("Some error occured while inserting language and report. Please again", error)
                await client.query("ROLLBACK")
                return res.status(500).json({ message: "Some error occured while saving the data. Please try again" });
            }



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


app.post('/test', upload.single('image'), (req, res) => {

    console.log(req.file)
    console.log(req.body)
    const report = {
        "disease": "Tomato Late Blight",
        "description": "A fungal disease causing large, greasy-looking spots on tomato leaves and stems.",
        "symptoms": [
            "Large, greasy-looking spots on leaves and stems",
            "Yellowing of leaves",
            "Premature defoliation"
        ],
        "causes": [
            "Water splashing on plants",
            "High humidity",
            "Infected seeds or transplants"
        ],
        "treatment": {
            "organic": [
                "Copper oxychloride 3 grams per liter of water spray",
                "Chlorothalonil 2 grams per liter of water spray"
            ],
            "non_organic": [
                "Mancozeb 2 grams per liter of water spray",
                "Chlorothalonil 2 grams per liter of water spray"
            ]
        },
        "prevention": [
            "Use disease-free seeds and transplants",
            "Maintain good air circulation",
            "Water plants at ground level"
        ],
        "note": "Due to high humidity (86.20%), fungal growth may increase. Spray treatments more frequently. Avoid spraying during peak sunlight hours to prevent crop burning."
    }

    res.status(201).json({
        report
    });

})

app.use((req, res) => {
    res.status(400).json({error: "route not found"})
})

app.listen(3000, '0.0.0.0', () => {
    console.log("✅ Server running on http://localhost:3000");
});