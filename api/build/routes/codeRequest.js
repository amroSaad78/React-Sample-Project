"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var codeRequest_1 = require("../controller/codeRequest");
var codeRequestRouter = (0, express_1.Router)();
codeRequestRouter
    .route("/code")
    .post(tsyringe_1.container.resolve(codeRequest_1.CodeRequestController).codeRequest);
exports.default = codeRequestRouter;
