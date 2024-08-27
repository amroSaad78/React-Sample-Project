"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
var errors_1 = require("../constants/errors");
var notFound = function (req, res, next) {
    return res.status(404).json({ errMessage: errors_1.notFoundRoute });
};
exports.notFound = notFound;
