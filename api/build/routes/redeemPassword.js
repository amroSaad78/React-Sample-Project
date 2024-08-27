"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var redeemPassword_1 = require("../controller/redeemPassword");
var redeemRouter = (0, express_1.Router)();
redeemRouter
    .route("/redeem/code")
    .post(tsyringe_1.container.resolve(redeemPassword_1.RedeemPasswordController).codeRequest);
redeemRouter
    .route("/redeem/verify")
    .post(tsyringe_1.container.resolve(redeemPassword_1.RedeemPasswordController).verifyCode);
exports.default = redeemRouter;
