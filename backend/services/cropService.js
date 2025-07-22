const { Pool } = require("pg")


//database connection
const pool = new Pool({
    user: "postgres",
    password: "Hitman005",
    host: "localhost",
    port: 5432,
    database: "progress_tracker"
})

// Insert crop health data into the database
async function saveCropData(user_id, plant_stage, sunlight, temperature, humidity, water_required, fertilizer_type, growth_milestone) {
    try {
      const timestamp = new Date().toISOString();
      const result = await pool.query(
        'INSERT INTO records (user_id, time_stamp, plant_stage, sunlight, temperature, humidity, water_required, fertilizer_type, growth_milestone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [user_id, timestamp, plant_stage, sunlight, temperature, humidity, water_required, fertilizer_type, growth_milestone]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error saving crop data:', error);
      // throw new Error('Failed to save crop data');
    }
  }
  
  module.exports = {
    saveCropData,
  };