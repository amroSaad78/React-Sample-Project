"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var config = require("../config/configurations");
module.exports = function (user) {
    return jwt.sign({
        id: user.id,
    }, config.TOKEN.secret, {
        issuer: config.TOKEN.issuer,
        algorithm: "HS256",
        expiresIn: config.TOKEN.expireTime,
    });
};
