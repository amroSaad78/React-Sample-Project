"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
var tsyringe_1 = require("tsyringe");
var errors_1 = require("../constants/errors");
var utf8 = require("utf8");
var base64 = require("base-64");
var Decoder = (function () {
    function Decoder() {
    }
    Decoder.prototype.decode = function (value) {
        try {
            return utf8.decode(base64.decode(value));
        }
        catch (_a) {
            throw { errMessage: errors_1.requestError, errno: 400 };
        }
    };
    Decoder = __decorate([
        (0, tsyringe_1.injectable)(),
        (0, tsyringe_1.scoped)(tsyringe_1.Lifecycle.ContainerScoped)
    ], Decoder);
    return Decoder;
}());
exports.Decoder = Decoder;
