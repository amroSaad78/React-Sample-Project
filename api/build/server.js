"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.DBSource = void 0;
require("reflect-metadata");
var requestPolicy_1 = require("./middleware/requestPolicy");
var errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
var notFound_1 = require("./middleware/notFound");
var dashRouter_1 = __importDefault(require("./middleware/dashRouter"));
var authRouter_1 = __importDefault(require("./middleware/authRouter"));
var pics_1 = __importDefault(require("./routes/pics"));
var typeorm_1 = require("typeorm");
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var fs = require("fs");
var path = require("path");
var https = require("https");
var fileUpload = require("express-fileupload");
var config = require("./config/configurations");
var log = require("simple-node-logger").createRollingFileLogger(config.LOGGER_OPTIONS);
exports.log = log;
var namespace = "Server";
var DBSource;
exports.DBSource = DBSource;
var httpsServer;
run();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createExpressApp();
                    return [4, runHttpsServer()];
                case 1:
                    _a.sent();
                    return [4, initializeDB()];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
process.on("unhandledRejection", function (err, promise) {
    console.error("===> ".concat(err.message));
    log.error("".concat(err.message, " | ").concat(namespace));
    httpsServer === null || httpsServer === void 0 ? void 0 : httpsServer.close(function () { return process.exit(1); });
});
function initializeDB() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    exports.DBSource = DBSource = new typeorm_1.DataSource(config.DB_OPTIONS);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, DBSource.initialize()];
                case 2:
                    _a.sent();
                    console.log("Data Source has been initialized!");
                    return [3, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("===> ".concat(err_1.message));
                    httpsServer === null || httpsServer === void 0 ? void 0 : httpsServer.close(function () { return process.exit(2); });
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function createExpressApp() {
    console.info("Creating Express app...");
    app.use(fileUpload({ useTempFiles: true, tempFileDir: "./temp/" }));
    app.use(express_1.default.json());
    app.use(requestPolicy_1.requestPolicy);
    app.use("/v1/auth", authRouter_1.default);
    app.use("/v1/dash", dashRouter_1.default);
    app.use("/v1/pics", pics_1.default);
    if (config.ENV === "production") {
        app.use(express_1.default.static(path.join(__dirname, "client")));
        app.get("/", function (req, res) {
            res.sendFile(path.join(__dirname, "client/index.html"));
        });
    }
    app.get("*", notFound_1.notFound);
    app.post("*", notFound_1.notFound);
    app.use(errorHandler_1.default);
}
function runHttpsServer() {
    return __awaiter(this, void 0, void 0, function () {
        var tls;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tls = {
                        cert: fs.readFileSync(path.join(__dirname, config.CERT)),
                        key: fs.readFileSync(path.join(__dirname, config.KEY)),
                    };
                    httpsServer = https.createServer(tls, app);
                    return [4, new Promise(function (resolve) {
                            httpsServer.listen(config.PORT, resolve);
                        })
                            .then(function () { return console.info("HTTPS server running on port No: ".concat(config.PORT)); })
                            .catch(function (err) { return console.error("===> ".concat(err.message)); })];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    });
}
