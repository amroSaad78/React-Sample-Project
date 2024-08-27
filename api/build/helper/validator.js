"use strict";
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
exports.Validator = void 0;
var tsyringe_1 = require("tsyringe");
var Validator = (function () {
    function Validator() {
        this._model = {};
    }
    Validator.prototype.set = function (key, message) {
        this._model[key] = message;
    };
    Validator.prototype.reset = function () {
        this._model = {};
        return this;
    };
    Validator.prototype.invalid = function () {
        return Object.keys(this._model).length > 0;
    };
    Validator.prototype.errors = function () {
        return this._model;
    };
    Validator.prototype.isNull = function (value, errorName, message) {
        if (!value)
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.required = function (value, errorName, message) {
        if (!value || value === "")
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.between = function (value, min, max, errorName, message) {
        var length = value === null || value === void 0 ? void 0 : value.length;
        if (!(length >= min && length <= max))
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isValidEmail = function (value, errorName, message) {
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(value))
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isValidTel = function (value, errorName, message) {
        var reg = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im;
        if (!reg.test(value))
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isValidDate = function (value, errorName, message) {
        var reg = /^\d{4}-\d{2}-\d{2}$/;
        if (!reg.test(value)) {
            this._model[errorName] = message;
            return this;
        }
        var date = new Date(value);
        var timestamp = date.getTime();
        if (typeof timestamp !== "number" || Number.isNaN(timestamp))
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isValidLength = function (value, length, errorName, message) {
        if ((value === null || value === void 0 ? void 0 : value.length) !== length)
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isValidSize = function (value, size, errorName, message) {
        if (value > size)
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isNumbersOnly = function (value, errorName, message) {
        var reg = /^\d+$/;
        if (!reg.test(value))
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isSecure = function (value, errorName, message) {
        var reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if (!reg.test(value))
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isEqual = function (value1, value2, errorName, message) {
        if (value1 !== value2)
            this._model[errorName] = message;
        return this;
    };
    Validator.prototype.isIncluded = function (value, values, errorName, message) {
        if (!values.includes(value))
            this._model[errorName] = message;
        return this;
    };
    Validator = __decorate([
        (0, tsyringe_1.injectable)(),
        (0, tsyringe_1.scoped)(tsyringe_1.Lifecycle.ContainerScoped),
        __metadata("design:paramtypes", [])
    ], Validator);
    return Validator;
}());
exports.Validator = Validator;
