const { Pool } = require("pg")
require('dotenv').config()


//database connection
const pool = new Pool()

module.exports = pool