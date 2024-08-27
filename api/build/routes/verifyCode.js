"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var codeVerfication_1 = require("../controller/codeVerfication");
var verifyRouter = (0, express_1.Router)();
verifyRouter
    .route("/verify")
    .post(tsyringe_1.container.resolve(codeVerfication_1.CodeVerficationController).verifyCode);
exports.default = verifyRouter;
