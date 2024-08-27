"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCourse = void 0;
var typeorm_1 = require("typeorm");
var baseModel_1 = require("../repository/baseModel");
var Course_1 = require("./Course");
var User_1 = require("./User");
var SubCourse = (function (_super) {
    __extends(SubCourse, _super);
    function SubCourse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)({ type: "mediumint", default: 0 }),
        __metadata("design:type", Object)
    ], SubCourse.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "smallint", default: 0 }),
        __metadata("design:type", Object)
    ], SubCourse.prototype, "hours", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "datetime", default: function () { return "now()"; } }),
        __metadata("design:type", Object)
    ], SubCourse.prototype, "startDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bool", default: false }),
        __metadata("design:type", Object)
    ], SubCourse.prototype, "isActive", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Course_1.Course; }, function (course) { return course.subCourses; }, {
            onDelete: "CASCADE",
        }),
        __metadata("design:type", Object)
    ], SubCourse.prototype, "course", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return User_1.User; }, function (user) { return user.subcourses; }),
        __metadata("design:type", Object)
    ], SubCourse.prototype, "users", void 0);
    SubCourse = __decorate([
        (0, typeorm_1.Entity)({ name: "subcourses" })
    ], SubCourse);
    return SubCourse;
}(baseModel_1.BaseModel));
exports.SubCourse = SubCourse;
