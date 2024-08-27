"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var userImage_1 = require("../controller/userImage");
var courseImage_1 = require("../controller/courseImage");
var picsRouter = (0, express_1.Router)();
picsRouter
    .route("/user/:id")
    .get(tsyringe_1.container.resolve(userImage_1.UserImageController).getImage);
picsRouter
    .route("/course/:id")
    .get(tsyringe_1.container.resolve(courseImage_1.CourseImageController).getImage);
exports.default = picsRouter;
