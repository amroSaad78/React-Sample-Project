"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var enums_1 = require("../constants/enums");
var userBasic_1 = require("../controller/userBasic");
var userImage_1 = require("../controller/userImage");
var user_1 = require("../controller/user");
var guard_1 = __importDefault(require("../middleware/guard"));
var userRouter = (0, express_1.Router)();
userRouter
    .route("/user/basic")
    .get(tsyringe_1.container.resolve(guard_1.default).setRoles(enums_1.RolesArray).protect, tsyringe_1.container.resolve(userBasic_1.UserBasicController).getUserData);
userRouter
    .route("/user")
    .post(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(user_1.UserController).create);
userRouter
    .route("/user/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(user_1.UserController).update);
userRouter
    .route("/user/:id")
    .delete(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userImage_1.UserImageController).truncateImage, tsyringe_1.container.resolve(user_1.UserController).del);
userRouter
    .route("/user/pages/:pageNo/:skip/:criteria?")
    .get(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(user_1.UserController).get);
userRouter
    .route("/user/image/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userImage_1.UserImageController).updateImage);
userRouter
    .route("/user/image/:id")
    .delete(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(userImage_1.UserImageController).deleteImage);
userRouter
    .route("/user/toggle/:id")
    .put(tsyringe_1.container.resolve(guard_1.default).setRoles([enums_1.Roles.ADMIN]).protect, tsyringe_1.container.resolve(user_1.UserController).toggle);
exports.default = userRouter;
