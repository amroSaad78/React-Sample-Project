"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subCourse_1 = __importDefault(require("../routes/subCourse"));
var userAssign_1 = __importDefault(require("../routes/userAssign"));
var message_1 = __importDefault(require("../routes/message"));
var course_1 = __importDefault(require("../routes/course"));
var user_1 = __importDefault(require("../routes/user"));
var express_1 = require("express");
var dashRouter = (0, express_1.Router)();
dashRouter.use("", user_1.default, course_1.default, subCourse_1.default, userAssign_1.default, message_1.default);
exports.default = dashRouter;
