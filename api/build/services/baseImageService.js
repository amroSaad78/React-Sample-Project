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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseImageService = void 0;
var errors_1 = require("../constants/errors");
var successResponse_1 = require("../helper/successResponse");
var server_1 = require("../server");
var path = require("path");
var config = require("../config/configurations");
var BaseImageService = (function () {
    function BaseImageService(repo, blob, namespace) {
        var _this = this;
        this.repo = repo;
        this.blob = blob;
        this.namespace = namespace;
        this.getImage = function (folder, fileName, entity) { return __awaiter(_this, void 0, void 0, function () {
            var result, rootFolder, filePath, options, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repo.findOne(entity, { id: fileName })];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            throw { errMessage: errors_1.notFoundFile, errno: 404 };
                        rootFolder = config.BLOB.root;
                        filePath = "".concat(folder, "/").concat(fileName);
                        if (!this.blob.exist("".concat(rootFolder, "/").concat(filePath))) {
                            rootFolder = "../assets";
                            filePath = "images/no_image.jpg";
                        }
                        options = this.getOptions(result.mime, rootFolder);
                        return [2, { filePath: filePath, options: options }];
                    case 2:
                        err_1 = _a.sent();
                        err_1.message && server_1.log.error("".concat(err_1.message, " | ").concat(this.namespace));
                        throw err_1;
                    case 3: return [2];
                }
            });
        }); };
        this.updateImage = function (tempPath, folder, fileName, mime, entity) { return __awaiter(_this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repo.findOne(entity, { id: fileName })];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        this.blob.emitUpload(this.namespace, tempPath, "".concat(config.BLOB.root, "/").concat(folder), fileName, mime, entity);
                        return [2, new successResponse_1.SuccessResponse({}, 201)];
                    case 2:
                        err_2 = _a.sent();
                        err_2.message && server_1.log.error("".concat(err_2.message, " | ").concat(this.namespace));
                        throw err_2;
                    case 3: return [2];
                }
            });
        }); };
        this.deleteImage = function (folder, fileName, entity, func) { return __awaiter(_this, void 0, void 0, function () {
            var result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repo.findOne(entity, { id: fileName })];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        this.blob.emitUnlink(this.namespace, "".concat(config.BLOB.root, "/").concat(folder), fileName, func);
                        return [2, new successResponse_1.SuccessResponse({}, 202)];
                    case 2:
                        err_3 = _a.sent();
                        err_3.message && server_1.log.error("".concat(err_3.message, " | ").concat(this.namespace));
                        throw err_3;
                    case 3: return [2];
                }
            });
        }); };
        this.updateMime = function (id, mime, entity) { return __awaiter(_this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repo.update(entity, { id: id }, {
                                mime: mime,
                            })];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        err_4 = _a.sent();
                        err_4.message && server_1.log.error("".concat(err_4.message, " | ").concat(this.namespace));
                        return [3, 3];
                    case 3: return [2];
                }
            });
        }); };
        this.getOptions = function (mime, rootFolder) {
            var options = {
                root: path.join(__dirname, rootFolder),
                dotfiles: "deny",
                headers: {
                    "Content-Type": mime || "image/jpeg",
                    "Cache-Control": "private, max-age=30, must-revalidate",
                },
            };
            return options;
        };
        this.blob.on("update", function (id, mime, entity) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.updateMime(id, mime, entity)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        this.blob.on("unlink", function (namespace, folder, fileName, func) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.blob.unlink(namespace, folder, fileName, func)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        this.blob.on("upload", function (namespace, tempPath, folder, fileName, mime, entity) {
            _this.blob.move(namespace, tempPath, folder, fileName, mime, entity);
        });
        this.blob.on("download", function (namespace, folder, fileName, entity, url) {
            _this.blob.download(namespace, folder, fileName, entity, url);
        });
    }
    return BaseImageService;
}());
exports.BaseImageService = BaseImageService;
