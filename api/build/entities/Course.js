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
exports.Course = void 0;
var mediaModel_1 = require("../repository/mediaModel");
var typeorm_1 = require("typeorm");
var SubCourse_1 = require("./SubCourse");
var Course = (function (_super) {
    __extends(Course, _super);
    function Course() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.Column)({ type: "nvarchar", length: 100, nullable: false, unique: true }),
        __metadata("design:type", Object)
    ], Course.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "nvarchar", length: 1000, nullable: true }),
        __metadata("design:type", Object)
    ], Course.prototype, "details", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return SubCourse_1.SubCourse; }, function (subCourse) { return subCourse.course; }),
        __metadata("design:type", Object)
    ], Course.prototype, "subCourses", void 0);
    Course = __decorate([
        (0, typeorm_1.Entity)({ name: "courses" })
    ], Course);
    return Course;
}(mediaModel_1.MediaModel));
exports.Course = Course;
