const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fileUploader = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const projectRoutes = require('./routes/project.routes');

server.use(cors());
server.use('/uploads', express.static('uploads'));
server.use(bodyParser.json({limit: '50mb'}));
server.use(fileUploader());


// TODO Add config file for PORT and mongoDB URI
mongoose.connect('mongodb://localhost:27017/projects', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`MongoDB connection successfully established!`);
});

server.use('/projects', projectRoutes);

server.listen(PORT, () => {
    console.log(`Jamm-website backend is running on port: ${PORT}`);
});