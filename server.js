// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(8030, server_call_back);
function server_call_back() {
    console.log("server is successfully running at port 8030")
}

// get route
app.get("/all", get_callback);
function get_callback(req,res) {
    res.send(projectData);
}

// post route
app.post('/add', post_callback);
function post_callback(req,res) {
    projectData.date = req.body.date;
    projectData.temperature = req.body.data.main.temp;
    projectData.feeling = req.body.feel;
    console.log(projectData)  
}
