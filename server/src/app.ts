import {MONGO_URI, SERVER_HOST, SERVER_PORT} from "./config/server.config";
import {postsRouter} from "./api/posts.route";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/posts', postsRouter);

mongoose.set('useFindAndModify', false);
mongoose.connect(`${MONGO_URI}/posts`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Posts: http://${SERVER_HOST}:${SERVER_PORT}\n`)))
    .catch(() => console.error("Couldn't connect to the database"));


