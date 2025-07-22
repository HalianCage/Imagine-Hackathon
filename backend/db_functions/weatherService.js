const axios = require('axios');
// require('dotenv').config();

const latitude = 19.073736
const longitude = 72.870549

//accessing the browser location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }, (error) => {
      console.error('Geolocation error:', error);
    });
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

// Environment variables
const apiKey = '9ab6b5a0575f4514bfd215129251801';
const apiUrl = "http://api.weatherapi.com/v1/history.json";  // Historical data endpoint

// Function to calculate the last 7 days' dates
function getLastSevenDays() {
  const days = [];
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i); // Subtract i days from the current date
    days.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }
  return days.reverse(); // Return the dates in chronological order (oldest first)
}

// Function to fetch weather data for the last 7 days
async function fetchWeeklyWeatherData() {
  try {
    const lastSevenDays = getLastSevenDays();
    let totalTemp = 0;
    let totalHumidity = 0;
    let totalSunlight = 0;

    for (const date of lastSevenDays) {
      // Make an API request to fetch the weather data for each of the last 7 days
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: `${latitude},${longitude}`,
          dt: date,  // Provide the specific date for historical data
          aqi: 'no',  // Exclude air quality index data
          alerts: 'no',  // Exclude weather alerts data
        }
      });

      const day = response.data.forecast.forecastday[0].day; // Extract the day data

      // Aggregate data
      totalTemp += day.avgtemp_c;
      totalHumidity += day.avghumidity;
      totalSunlight += 9;//day.solar;
      console.log(totalSunlight)
    }

    // Calculate weekly averages
    const avgTemp = totalTemp / 7;
    const avgHumidity = totalHumidity / 7;
    const avgSunlight = totalSunlight / 7;

    console.log(avgSunlight)

    console.log('Weekly Aggregates for the Last 7 Days:');
    console.log(`Average Temperature: ${avgTemp.toFixed(2)}°C`);
    console.log(`Average Humidity: ${avgHumidity.toFixed(2)}%`);
    console.log(`Average Sunlight Hours: ${avgSunlight.toFixed(2)} hours`);

    return { avgTemp, avgHumidity, avgSunlight };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}

// Run the function
module.exports = { 
    fetchWeeklyWeatherData,
}
// fetchWeeklyWeatherData();
