import {Express} from 'express';
import {MONGO_URI, SERVER_HOST, SERVER_PORT} from "./config/server.config";
import {postsRouter} from "./api/posts.route";
import {baseLogsConfig, errorsLogsConfig} from "./config/logger.config";
import * as expressWinston from 'express-winston';

const express = require('express');
const cors = require('cors');

const app: Express = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use(expressWinston.logger(baseLogsConfig));
app.use('/posts', postsRouter);
app.use(expressWinston.errorLogger(errorsLogsConfig));

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(`${MONGO_URI}/posts`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Posts: http://${SERVER_HOST}:${SERVER_PORT}\n`)))
    .catch(() => console.error("Couldn't connect to the database"));


