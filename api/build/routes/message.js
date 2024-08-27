"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var subCourseMessage_1 = require("../controller/subCourseMessage");
var userMessage_1 = require("../controller/userMessage");
var enums_1 = require("../constants/enums");
var guard_1 = __importDefault(require("../middleware/guard"));
var tsyringe_1 = require("tsyringe");
var express_1 = require("express");
var messageRouter = (0, express_1.Router)();
messageRouter
    .route("/message/user")
    .post(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userMessage_1.UserMessageController).create);
messageRouter
    .route("/message/subcourse")
    .post(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(subCourseMessage_1.SubCourseMessageController).create);
messageRouter
    .route("/message/user/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userMessage_1.UserMessageController).update);
exports.default = messageRouter;
