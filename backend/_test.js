const { saveCropData } = require('../db_functions/cropService')



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

_testSaveCropData()