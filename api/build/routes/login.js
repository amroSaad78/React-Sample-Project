"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var login_1 = require("../controller/login");
var loginRouter = (0, express_1.Router)();
loginRouter.route("/login").post(tsyringe_1.container.resolve(login_1.LoginController).login);
exports.default = loginRouter;
