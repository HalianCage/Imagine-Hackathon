const axios = require('axios');

const latitude = 19.073736;
const longitude = 72.870549;

// Returns last 7 calendar days in YYYY‑MM‑DD array (excluding today)
function getLastSevenDays() {
  const days = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days.reverse();
}

async function fetchWeeklyWeatherData() {

  console.log('Fetching weekly weather data...');

  try {

    const last7 = getLastSevenDays();

    //debugging line to check the last 7 days
    console.log('Last 7 days:', last7);


    const start = last7[0];
    const end = last7[last7.length - 1];

    const apiUrl = 'https://historical-forecast-api.open-meteo.com/v1/forecast';
    let response;

    try {

      // Debugging line to check the API URL and parameters
      console.log('Sending request to:', apiUrl, {
        latitude,
        longitude,
        start_date: start,
        end_date: end,
      });


      response = await axios.get(apiUrl, {
        timeout: 10000, // Set a timeout of 10 seconds
        params: {
          latitude,
          longitude,
          start_date: start,
          end_date: end,
          hourly: 'temperature_2m,relative_humidity_2m',
          daily: 'sunshine_duration',
          timezone: 'auto'
        }
      });

      // Debugging line to check the response status and data
      if (!response || !response.data) {
        console.error("No data received from weather API");
        }

    } catch (error) {

      console.error('Error fetching weather data:', error.message);
      throw new Error('Failed to fetch weather data');
      
    }

    // console.log('Weather data fetched successfully', response.data);

    const { hourly, daily } = response.data;
    const hours = hourly.time.length;

    // Average temperature and humidity across all hourly samples for 7 days:
    let sumTemp = 0;
    let sumHumidity = 0;
    for (let i = 0; i < hours; i++) {
      sumTemp += hourly.temperature_2m[i];
      sumHumidity += hourly.relative_humidity_2m[i];
    }
    const avgTemp = sumTemp / hours;
    const avgHumidity = sumHumidity / hours;

    // Sunshine: daily.sunshine_duration is in seconds per day
    let sumSunSec = 0;
    for (let sec of daily.sunshine_duration) {
      sumSunSec += sec;
    }
    const avgSunlight = (sumSunSec / daily.sunshine_duration.length) / 3600; // to hours

    console.log('Weekly Aggregates:');
    console.log(`Average Temperature: ${avgTemp.toFixed(2)}°C`);
    console.log(`Average Humidity: ${avgHumidity.toFixed(2)}%`);
    console.log(`Average Sunlight Hours: ${avgSunlight.toFixed(2)} h`);

    return { avgTemp, avgHumidity, avgSunlight };

  } catch (err) {
    console.error('Some error occured in weatherService.js', err.message);
    throw new Error('Failed to fetch weather data');
  }
}

module.exports = { fetchWeeklyWeatherData };
