"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userAssign_1 = require("../controller/userAssign");
var enums_1 = require("../constants/enums");
var guard_1 = __importDefault(require("../middleware/guard"));
var tsyringe_1 = require("tsyringe");
var express_1 = require("express");
var assignRouter = (0, express_1.Router)();
assignRouter
    .route("/assign/user/pages/:pageNo/subcourses/:subCourseId/:criteria?")
    .get(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userAssign_1.UserAssignController).get);
assignRouter
    .route("/assign/user/toggle/:userId")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userAssign_1.UserAssignController).toggle);
exports.default = assignRouter;
