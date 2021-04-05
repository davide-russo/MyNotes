import {postsRouter} from "./api/posts.route";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

console.log('[ POSTS API ]\n');

const app = express();

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/posts', postsRouter);

const mongoUri = process.env.MONGO_URI;
const serverPort = process.env.SERVER_PORT;
const serverHost = process.env.SERVER_HOST;
const logServerReady = () => console.log(`Listening: http://${serverHost}:${serverPort}\n`);

mongoose.set('useFindAndModify', false);
mongoose.connect(`${mongoUri}/posts`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(serverPort, serverHost, () => logServerReady()))
    .catch(() => console.error("Couldn't connect to the database"));

