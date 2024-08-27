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
exports.BlobService = void 0;
var tsyringe_1 = require("tsyringe");
var events_1 = __importDefault(require("events"));
var server_1 = require("../server");
var fs = require("fs");
var path = require("path");
var https = require("https");
var FileType = require("file-type");
var config = require("../config/configurations");
var BlobService = (function (_super) {
    __extends(BlobService, _super);
    function BlobService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emitDownload = function (namespace, folder, fileName, entity, url) {
            if (!url)
                return;
            _this.emit("download", namespace, folder, fileName, entity, url);
        };
        _this.emitUpload = function (namespace, tempPath, folder, fileName, mime, entity) {
            _this.emit("upload", namespace, tempPath, folder, fileName, mime, entity);
        };
        _this.emitUnlink = function (namespace, folder, fileName, func) {
            _this.emit("unlink", namespace, folder, fileName, func);
        };
        _this.emitUpdate = function (fileName, mime, entity) {
            return _this.emit("update", fileName, mime, entity);
        };
        _this.download = function (namespace, folder, fileName, entity, url) {
            https.get(url, function (res) {
                var data = [];
                res.on("data", function (chunk) {
                    data.push(chunk);
                });
                res.on("end", function () { return __awaiter(_this, void 0, void 0, function () {
                    var buffer, mime, filePath;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                buffer = Buffer.concat(data);
                                return [4, FileType.fromBuffer(buffer)];
                            case 1:
                                mime = (_a.sent()).mime;
                                if (!config.ALLOWED_FILES.IMAGES.includes(mime))
                                    return [2];
                                if (config.MAX_SIZE.IMAGES < Buffer.byteLength(buffer))
                                    return [2];
                                filePath = path.join(__dirname, "".concat(folder, "/").concat(fileName));
                                if (!this.createDirIfNotExist(filePath))
                                    return [2];
                                fs.writeFile(filePath, buffer, function (err) {
                                    if (err) {
                                        server_1.log.error("".concat(err.message, " | ").concat(namespace));
                                        return;
                                    }
                                    _this.emitUpdate(fileName, mime, entity);
                                });
                                return [2];
                        }
                    });
                }); });
                res.on("error", function (err) {
                    server_1.log.error("".concat(err.message, " | ").concat(namespace));
                });
            });
        };
        _this.move = function (namespace, tempPath, folder, fileName, mime, entity) {
            var filePath = path.join(__dirname, "".concat(folder, "/").concat(fileName));
            if (!_this.createDirIfNotExist(filePath))
                return;
            fs.rename(tempPath, filePath, function (err) {
                if (err) {
                    server_1.log.error("".concat(err.message, " | ").concat(namespace));
                    return;
                }
                _this.emitUpdate(fileName, mime, entity);
            });
        };
        _this.unlink = function (namespace, folder, fileName, func) { return __awaiter(_this, void 0, void 0, function () {
            var filePath, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path.join(__dirname, "".concat(folder, "/").concat(fileName));
                        if (!fs.existsSync(filePath))
                            return [2];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, fs.promises.unlink(filePath)];
                    case 2:
                        _a.sent();
                        func();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        server_1.log.error("".concat(err_1.message, " | ").concat(namespace));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        _this.exist = function (filePath) {
            if (fs.existsSync(path.join(__dirname, filePath)))
                return true;
            return false;
        };
        _this.createDirIfNotExist = function (filePath) {
            var dirname = path.dirname(filePath);
            if (fs.existsSync(dirname))
                return true;
            try {
                fs.mkdirSync(dirname, { recursive: true });
                return true;
            }
            catch (_a) {
                return false;
            }
        };
        return _this;
    }
    BlobService = __decorate([
        (0, tsyringe_1.injectable)()
    ], BlobService);
    return BlobService;
}(events_1.default));
exports.BlobService = BlobService;
