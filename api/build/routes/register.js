"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var register_1 = require("../controller/register");
var regRouter = (0, express_1.Router)();
regRouter
    .route("/register")
    .post(tsyringe_1.container.resolve(register_1.RegisterController).register);
exports.default = regRouter;
