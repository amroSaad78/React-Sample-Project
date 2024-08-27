"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
var ErrorResponse = (function () {
    function ErrorResponse(error, statusCode) {
        this.statusCode = statusCode;
        this.error = error;
    }
    return ErrorResponse;
}());
exports.ErrorResponse = ErrorResponse;
