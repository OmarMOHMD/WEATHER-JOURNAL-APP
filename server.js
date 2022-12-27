/* Empty JS object to act as endpoint for all routes *server side script* */
let projectData = {};
// Express to run server and routes
const express = require('express');
//import express, { static } from 'express';
// Start up an instance of app
const app = express();
/* Dependencies  */
const bodyParser = require('body-parser')
// import { urlencoded, json } from 'body-parser';
// here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// import cors from 'cors';
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const PORT = 8000;
// spin up the server
const server = app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));
//*Another way*first initialize */ 
// const server = app.listen(PORT, listening);
// callBack to debug 
// function listening(){
// console.log('server is running');
// console.log(`on localhost: ${PORT}`);
// };

// TODO-Spin up the server
//gat data
app.get('/getData',(req, res) => {
    res.send(projectData)
});
// app.get('/getMovie', (req, res) => {
//     res.send(projectData)
// });
//send data 
app.post('/sendData',(req, res) => {
    projectData = req.body;
    res.send('success');
});
// Setup Server