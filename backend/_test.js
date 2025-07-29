// const { saveCropData } = require('./services.cropService.js')
const { fetchWeeklyWeatherData } = require('../backend/services/weatherService')



// function to test the saveCropData function
async function _testSaveCropData() {

    console.log('Testing saving crop data function')

    //try - catch block 
    try {

        await saveCropData(6, 'Seedling', 50, 26, 45, 23, 'organic', 3)

        console.log('Test 1 complete')

    }
    catch(e) {

        console.log('Some error occured in testing: ', e)
    }
}


//function to test the weather service API
async function _testWeatherService() {

    console.log("testing the weather service API")

    //try-catch block
    try {

        const weatherData = await fetchWeeklyWeatherData();
        console.log(weatherData)
        
    }
    catch(e) {
        console.log("Some error occured while fetching weather data", e)
    }

}

// _testSaveCropData()
_testWeatherService()