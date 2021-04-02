import {LoggerOptions} from "express-winston";
import winston from "winston";

export const baseLogsConfig: LoggerOptions = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
};

export const errorsLogsConfig: LoggerOptions = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
};
