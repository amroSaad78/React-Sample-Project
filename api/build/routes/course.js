"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var guard_1 = __importDefault(require("../middleware/guard"));
var enums_1 = require("../constants/enums");
var course_1 = require("../controller/course");
var courseImage_1 = require("../controller/courseImage");
var courseRouter = (0, express_1.Router)();
courseRouter
    .route("/course")
    .post(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(course_1.CourseController).create);
courseRouter
    .route("/course/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(course_1.CourseController).update);
courseRouter
    .route("/course/:id")
    .delete(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(courseImage_1.CourseImageController).truncateImage, tsyringe_1.container.resolve(course_1.CourseController).del);
courseRouter
    .route("/course/pages/:pageNo/:skip/:criteria?")
    .get(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(course_1.CourseController).get);
courseRouter
    .route("/course/image/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(courseImage_1.CourseImageController).updateImage);
courseRouter
    .route("/course/image/:id")
    .delete(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(courseImage_1.CourseImageController).deleteImage);
exports.default = courseRouter;
