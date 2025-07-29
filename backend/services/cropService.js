const pool = require('../config/db')




// Inserting crop health data into the database
async function saveCropData(user_id, plant_stage, sunlight, temperature, humidity, water_required, fertilizer_type, growth_milestone) {

  // try-catch block
  try {

    // getting current time and chagning to string
    const timestamp = new Date().toISOString();

    //making the db sql query tosave data to table
    const result = await pool.query(
      'INSERT INTO records VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [user_id, timestamp, plant_stage, sunlight, temperature, humidity, water_required, fertilizer_type, growth_milestone]
    );
    
    console.log(result.rows)

  } catch (error) {
    console.error('Error saving crop data:', error);
    // throw new Error('Failed to save crop data');
  }
}
  
module.exports = {
  saveCropData,
};