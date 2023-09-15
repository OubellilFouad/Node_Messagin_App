const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error.message)
});

const server = app.listen(process.env.PORT,(req,res) => {
    console.log('Connected');
})