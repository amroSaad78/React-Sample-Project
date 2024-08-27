"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = __importDefault(require("../routes/login"));
var register_1 = __importDefault(require("../routes/register"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var google_1 = __importDefault(require("../routes/google"));
var verifyCode_1 = __importDefault(require("../routes/verifyCode"));
var redeemPassword_1 = __importDefault(require("../routes/redeemPassword"));
var codeRequest_1 = __importDefault(require("../routes/codeRequest"));
var config = require("../config/configurations");
var limiter = (0, express_rate_limit_1.default)(config.RATE_LIMIT);
var authRouter = (0, express_1.Router)();
authRouter.use("", limiter, register_1.default, login_1.default, google_1.default, redeemPassword_1.default, verifyCode_1.default, codeRequest_1.default);
exports.default = authRouter;
