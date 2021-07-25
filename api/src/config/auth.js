const dotenv = require('dotenv').config();

module.exports ={
    AUTH_SECRET:process.env.AUTH_SECRET || 'secretncr',
    AUTH_EXPIRES:process.env.AUTH_EXPIRES || '24hs',
    AUTH_ROUNDS:process.env.AUTH_ROUNDS || 10
}