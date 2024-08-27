"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var errors_1 = require("../constants/errors");
require("dotenv").config();
module.exports = {
    PORT: process.env.PORT || 4443,
    ENV: process.env.ENV || "development",
    CERT: process.env.TLS_CERT || "./certs/cert.pem",
    KEY: process.env.TLS_KEY || "./certs/key.pem",
    ORIGIN: process.env.ORIGIN || "*",
    DB_OPTIONS: {
        type: "mysql",
        host: "localhost",
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME || "sofraa",
        username: process.env.DB_USERNAME || "root",
        password: process.env.DB_PASSWORD || "#tRx-1402m9@",
        entities: [path_1.default.resolve(__dirname, "..", "entities/*")],
        synchronize: true,
        charset: "UTF8_GENERAL_CI",
    },
    LOGGER_OPTIONS: {
        logDirectory: path_1.default.join(__dirname, "../../logs"),
        fileNamePattern: "roll-<DATE>.log",
        dateFormat: "YYYY.MM.DD",
    },
    MAILER: {
        from: process.env.EMAIL_FROM,
        centerName: process.env.CENTER_NAME,
    },
    MAILER_TRANSPORTER: {
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    },
    RATE_LIMIT: {
        windowMs: 60 * 1000,
        max: process.env.RATE_OF_REQUESTS || 5,
        message: { errMessage: errors_1.throttle },
        standardHeaders: false,
        legacyHeaders: false,
    },
    TOKEN: {
        secret: process.env.SERVER_TOKEN_SECRET || "NoTokenSecret",
        issuer: process.env.SERVER_TOKEN_ISSUER || "HomeCompany",
        expireTime: process.env.SERVER_TOKEN_EXPIRETIME || 3600,
    },
    GOOGLE: {
        clientID: process.env.GOOGLE_CLIENT_ID,
    },
    BLOB: {
        root: process.env.BLOB_ROOT || "../blob",
        user: "1",
        course: "2",
    },
    ALLOWED_FILES: {
        IMAGES: ((_a = process.env.IMAGES_EXTENSIONS) === null || _a === void 0 ? void 0 : _a.split(" ")) || [
            "image/png",
            "image/jpeg",
        ],
    },
    MAX_SIZE: {
        IMAGES: process.env.IMAGES_MAX_SIZE_IN_MB
            ? parseInt(process.env.IMAGES_MAX_SIZE_IN_MB) * 1048576
            : 1048576,
    },
    PAGE_SIZE: process.env.PAGE_SIZE || 20,
};
