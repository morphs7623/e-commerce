const mongoose = require('mongoose')
require('dotenv').config()

const mongoURL = process.env.DB_URL_LOCAL

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
    console.log("databse is connected")
})

db.on('disconnected', () => {
    console.log("databse is disconnected")
})

db.on('error', (err) => {
    console.log("error coming to database")
})

module.exports = db;