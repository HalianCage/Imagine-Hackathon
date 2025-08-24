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
const { loadEnvFile} = require("process");
// const cropService = require("./services/cropService");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());

//making the uploads folder public so that it is accessible over http request(for progress_tracker)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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

        //variable to store the disease name api response
        let diseaseResponse;

        //variable to store the disease spread api response
        let spreadResponse;

        //variable to store the spreadPercent
        let spreadPercent;

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

        //local storage image path for the disease prediction model
        const imagePathDisease = path.join(__dirname, "uploads", req.file.filename);
        console.log("Image path for disease prediction model:", imagePathDisease);


        //public url of image for progress tracking page from frontend to access
        const imagePathPublic = `http:\\\\192.168.1.2:3000\\uploads\\${req.file.filename}`;
        console.log("Public Image URL:", imagePathPublic);


        //creating the client database connection
        const client = await pool.connect()

        console.log(client)

        //pushing the image path to the database
        try {

            await client.query('BEGIN')

            const queryResult = await client.query(`INSERT INTO record_table(user_id, image_uri) VALUES ($1, $2) RETURNING id`, [user_id, imagePathPublic])

            await client.query('COMMIT')

            id = queryResult.rows[0].id

            console.log('successfully stored the image uri in the database. row Id: ', id)


        } catch (error) {
            
            console.error("Some error occured while pushing image path to the database", error)
            res.status(500).json({error: "Some error occured! Please try again"})

        }

        // console.log("ImagePath: ", imagePathDisease)
        // console.log("formData: ", formData)


        
        //Try-catch block to handle errors while calling the disease prediction API
        try {

            //image path to send to the disease name prediction model
            const formData = new FormData();
            formData.append("image", fs.createReadStream(imagePathDisease));


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
        

        //pushing predicted disease to the database
        try {
            
            await client.query("BEGIN")

            const formsQueryResult = await client.query(`UPDATE record_table SET disease_name = $1 WHERE id = $2 `, [diseaseName, id])

            await client.query("COMMIT")

            console.log('disease name insert query successful')


        } catch (error) {
            
            console.log("Some error occured while inserting disease name. Please again", error)
            await client.query("ROLLBACK")
            return res.status(500).json({ message: "Some error occured while saving the data. Please try again" });
        }
        


        //Try-catch block to handle errors while calling the spread percentage flask API
        try {

            console.log('inside disease spread try catch')

            //image path to send to the disease name prediction model
            const formData = new FormData();
            formData.append("image", fs.createReadStream(imagePathDisease));

            spreadResponse = await axios.post("http://localhost:5001/spreadPercent", formData, {
                headers: formData.getHeaders(),
            });

            console.log('successfully fetched spread percentage flask')
            
        } catch (error) {
            console.error("Error calling disease spread API:", error.message);
            
        }

        // Check if the response contains the expected data
        if (!spreadResponse) {
            console.log('invalid data sent from disease spread model');
        }

        spreadPercent = spreadResponse.data.spread_percentage

        //debugging line to check the disease name
        console.log("Approximate spread of disease:", spreadPercent);


        
        //pushing disease spread to the database
        try {
            
            await client.query("BEGIN")

            const formsQueryResult = await client.query(`UPDATE record_table SET spread_percent = $1 WHERE id = $2 `, [Number(spreadPercent), id])

            await client.query("COMMIT")

            console.log('disease name insert query successful')


        } catch (error) {
            
            console.log("Some error occured while inserting disease spread percentage. Please again", error)
            await client.query("ROLLBACK")
            return res.status(500).json({ message: "Some error occured while saving the data. Please try again" });
        }
        




        //if-else block to fetch weather data only if location has been passed
        if(!location || !location.latitude || !location.longitude) {

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


//api to send all past reports to the frontend for history/progress tracking
app.get('/getReports', async (req, res) => {

    console.log("inside the /getReports api")

    const client = await pool.connect()

    try {
        
        const queryResult = await client.query(`SELECT id, image_uri, disease_name, time_stamp, spread_percent FROM record_table`)

        console.log('successfully completed get query:\n')

        const reportArray = {"array": queryResult.rows}

        // console.log('data set:\n', reportArray)

        client.release()

        res.status(200).json(reportArray)

    } catch (error) {
        
        console.error("Some error occured while fetching from database", error)

        res.status(500).json({error: "Unable to process request, please try again"})
    }


})

//route to get a specific report
app.get('/getSingleReport/:id', async (req, res) => {

    console.log('inside getSingleReport route')

    const id = req.params.id
    let report;

    console.log('id to be fetched: ', id)

    const client = await pool.connect()

    try {
        const queryResult = await client.query(`SELECT report FROM record_table WHERE id = $1`, [id])

        console.log("Successfully fetched report")

        console.log(queryResult.rows[0].report)
        report = queryResult.rows[0].report
        
    } catch (error) {
        console.error("Some error occured while fetching a report: ", error)
        res.status(500).json({error: "Some error occured while fetching data. Please try again"})
    }

    res.json({report})

})


app.get('/getProgressReports', async (req, res) => {




})


app.use((req, res) => {
    res.status(400).json({error: "route not found"})
})

app.listen(3000, '0.0.0.0', () => {
    console.log("✅ Server running on http://localhost:3000");
});