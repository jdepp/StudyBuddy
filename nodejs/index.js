// This is the "main method" of NodeJs and imports the libraries we need and defines our controller and what port to listen to requests on.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');

// Define controllers here, example:
var studySetController = require('./controllers/StudySetController.js');

var app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(4000, () => console.log('Server started on port 4000'));

app.use('/api/studysets', studySetController);
