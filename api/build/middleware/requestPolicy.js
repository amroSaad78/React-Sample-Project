"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPolicy = void 0;
var config = require("../config/configurations");
var requestPolicy = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", config.ORIGIN);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res
            .status(200)
            .json({ "Requests types: ": "PUT, POST, DELETE, GET" });
    }
    next();
};
exports.requestPolicy = requestPolicy;
