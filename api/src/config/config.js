const dotenv = require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_USER: process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    //FRONT_HOST = process.env.FRONT_HOST
}