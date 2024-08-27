"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesArray = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles["ADMIN"] = "admin";
    Roles["INSTRUCTOR"] = "instructor";
    Roles["TRAINEE"] = "trainee";
})(Roles = exports.Roles || (exports.Roles = {}));
exports.RolesArray = Object.values(Roles);
