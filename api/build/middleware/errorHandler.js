"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("../constants/errors");
var errorHandler = function (payload, req, res, next) {
    var statusCode = payload.statusCode, error = payload.error;
    switch (error === null || error === void 0 ? void 0 : error.code) {
        case "ER_DUP_ENTRY":
            return res
                .status(400)
                .json({ errMessage: error.sqlMessage.split("for")[0].trim() });
        case "ER_NO_SUCH_TABLE":
            return res.status(500).json({ errMessage: errors_1.dbTableError });
        case "ECONNREFUSED":
            return res.status(500).json({ errMessage: errors_1.connectionError });
        default:
            res.status(statusCode || 500).json(error);
    }
};
exports.default = errorHandler;
