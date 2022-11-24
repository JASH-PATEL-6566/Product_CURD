const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require('./Routes/Router');

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

Router(app);


mongoose.connect("mongodb://localhost:27017/product-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Database connected");
})


app.listen(9000, () => {
    console.log("Connected");
})