import express, {Express} from 'express';
import {SERVER_HOST, SERVER_PORT} from "./config/server.config";
import {postsRouter} from "./api/posts.route";
import {baseLogsConfig, errorsLogsConfig} from "./config/logger.config";
import * as expressWinston from 'express-winston';

const app: Express = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(expressWinston.logger(baseLogsConfig));
app.use('/posts', postsRouter);
app.use(expressWinston.errorLogger(errorsLogsConfig));

app.listen(SERVER_PORT, SERVER_HOST, () => console.log(`Posts: http://${SERVER_HOST}:${SERVER_PORT}\n`));
