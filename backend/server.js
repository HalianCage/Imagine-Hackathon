const postgres = require("postgres")
const express = require("express")
const bodyParser = require("body-parser")
const weatherService = require("./services/weatherService")
const cropService = require("./services/cropService")
const axios = require("axios")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
const upload = multer({dest: "uploads/"})
// Route to save crop data

app.get('/', (req, res) => {
    console.log("Hello World!")
    res.write("Hello World!")
})
app.post('/api/crop/save', upload.single('image'), async (req, res) => {
    try {
      if(!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
      }

      const imagePath = path.join(__dirname, 'uploads', req.file.filename);
      console.log(imagePath);
      //path uploading to database

       // Create a FormData to send the image to Flask API
      const formData = new FormData();
      formData.append('image', fs.createReadStream(imagePath));

      // Send image to the Flask server for prediction
      const response = await axios.post('http://127.0.0.1:5000/disease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data)

      const jsonData = JSON.parse(req.body.data);

      const { user_id, plant_stage, water_required, fertilizer_type } = jsonData;
      console.log(jsonData)

      let Plant_Stage = 0;
      if(plant_stage == "adult") {
        Plant_Stage = 2
      } else if(plant_stage == "seedling") {
        Plant_Stage = 0
      } else {
        Plant_Stage = 1
      }

      let Fertilizer_Type = 0;
      if(fertilizer_type == "organic") {
        Fertilizer_Type = 1
      } else if(fertilizer_type == "chemical") {
        Fertilizer_Type = 2
      }
  
      // Fetch sunlight, temperature, and humidity
      const { avgTemp, avgHumidity, avgSunlight }= await weatherService.fetchWeeklyWeatherData()
      // console.log(avgTemp, avgHumidity)

      const inputData = [ Plant_Stage, water_required, avgSunlight, avgTemp, avgHumidity, Fertilizer_Type]

      const modelResponse = await axios.post("http://127.0.0.1:5000/predict", {
         input: inputData
      })

      const prediction = modelResponse.data.prediction;
  
      // Save the crop data to the database
      console.log(user_id)
      const savedData = await cropService.saveCropData(user_id, plant_stage, avgSunlight, avgTemp, avgHumidity, water_required, fertilizer_type, prediction);
  
      res.status(201).json({ message: 'Data saved successfully', data: savedData });
    } catch (error) {
      console.error('Error processing crop data:', error);
      res.status(500).json({ message: 'Error saving data', error: error.message });
    }
  });


//   // Route to fetch data, send to ML model, and return the prediction
// app.post('/predict', async (req, res) => {
//   try {
//     // Query to fetch the required input data for the model
//     const query = `
//       SELECT water_required, sunlight, temperature, humidity, plant_stage
//       FROM crop_health_data
//       ORDER BY timestamp DESC
//       LIMIT 1
//     `;

//     // Fetching the latest record from the database
//     const dbResponse = await pool.query(query);
//     if (dbResponse.rows.length === 0) {
//       return res.status(404).send('No data found in the database.');
//     }

//     // Extract the required fields for the ML model input
//     const latestRecord = dbResponse.rows[0];
//     const inputData = [
//       latestRecord.water_required,
//       latestRecord.sunlight,
//       latestRecord.temperature,
//       latestRecord.humidity,
//       latestRecord.plant_stage,
//     ];

//     // Sending data to the ML model (Flask API)
//     const modelResponse = await axios.post('http://localhost:5000/predict', {
//       input: inputData,
//     });

//     // Getting prediction from the model response
//     const prediction = modelResponse.data.prediction;

//     await pool.query(`UPDATE records SET growth_milestone = $1 WHERE time_stamp = (SELECT MAX(time_stamp) FROM records)`, [prediction])

//     // Returning the prediction to the client
//     res.json({ prediction });


//   } catch (error) {

//     console.error('Error during prediction:', error.message);
//     res.status(500).send('Error during prediction');
//   }
// });

app.listen(3000, () => {
    console.log("Listening to port 3000")
})      