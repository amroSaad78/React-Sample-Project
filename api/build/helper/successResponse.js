"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
var SuccessResponse = (function () {
    function SuccessResponse(object, statusCode) {
        this.statusCode = statusCode;
        this.object = object;
    }
    return SuccessResponse;
}());
exports.SuccessResponse = SuccessResponse;
