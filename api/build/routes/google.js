"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var google_1 = require("../controller/google");
var googleRouter = (0, express_1.Router)();
googleRouter
    .route("/google")
    .post(tsyringe_1.container.resolve(google_1.GoogleController).googleChecking);
exports.default = googleRouter;
