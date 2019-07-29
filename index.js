const express = require('express');
const app = express();
const helmet = require('helmet');
const isset = require('isset');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const api = require('./routes/api');

// for parsing json data
app.use(bodyParser.json());
// for parsing form url-encoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart-formdata
app.use(express.static('public'));
app.use(helmet());

app.use('/api', api);

// mongodb (mongoose) connection
mongoose.connect('mongodb://@localhost:27017/AstrologyGuruDb', { useNewUrlParser: true })
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.log('Could not connect to mongodb... ', err));
// .mongodb (mongoose) connection

// app - port and listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// .app - port and listen