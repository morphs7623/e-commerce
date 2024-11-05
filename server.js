const express = require('express')
const app = express();
require('dotenv').config
PORT = process.env.PORT || 8000
app.use(express.json());
const db = require('./db/db')
const path = require('path');
const userRoute = require('./Routers/userRoute')
const productRoute = require('./Routers/productRoute')

app.get('/', async (req, res) => {
    res.status(200).send("hello i am meet")
})

app.use('/user', userRoute)


app.use('/product', productRoute)


app.listen(PORT, () => {
    console.log(`SERVER STARTED AT http://localhost:${PORT}`)
});