import {notesRoute} from "./api/notes.route";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

console.log('[ POST-EAT API ]\n');

const app = express();

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/notes', notesRoute);

const mongoUri = process.env.MONGO_URI;
const serverPort = process.env.SERVER_PORT;
const serverHost = process.env.SERVER_HOST;
const logServerReady = () => console.log(`Listening: http://${serverHost}:${serverPort}\n`);
const logDbConnectionError = () => console.error("Couldn't connect to the database");
mongoose.set('useFindAndModify', false);
mongoose.connect(`${mongoUri}/notes`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(serverPort, serverHost, logServerReady))
    .catch(logDbConnectionError);

