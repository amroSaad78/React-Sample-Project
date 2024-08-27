"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var guard_1 = __importDefault(require("../middleware/guard"));
var enums_1 = require("../constants/enums");
var subCourse_1 = require("../controller/subCourse");
var subCourseRouter = (0, express_1.Router)();
subCourseRouter
    .route("/subcourse")
    .post(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(subCourse_1.SubCourseController).create);
subCourseRouter
    .route("/subcourse/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(subCourse_1.SubCourseController).update);
subCourseRouter
    .route("/subcourse/:id")
    .delete(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(subCourse_1.SubCourseController).del);
subCourseRouter
    .route("/subcourse/:courseId/:pageNo/:skip")
    .get(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(subCourse_1.SubCourseController).get);
subCourseRouter
    .route("/subcourse/toggle/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(subCourse_1.SubCourseController).toggle);
exports.default = subCourseRouter;
