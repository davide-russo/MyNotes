"use strict";
exports.__esModule = true;
exports.errorsLogsConfig = exports.baseLogsConfig = void 0;
var winston_1 = require("winston");
exports.baseLogsConfig = {
    transports: [
        new winston_1["default"].transports.Console()
    ],
    format: winston_1["default"].format.combine(winston_1["default"].format.colorize(), winston_1["default"].format.json())
};
exports.errorsLogsConfig = {
    transports: [
        new winston_1["default"].transports.Console()
    ],
    format: winston_1["default"].format.combine(winston_1["default"].format.colorize(), winston_1["default"].format.json())
};
