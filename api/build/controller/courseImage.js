"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseImageController = void 0;
var courseImageService_1 = require("../services/courseImageService");
var errorResponse_1 = require("../helper/errorResponse");
var messages = __importStar(require("../constants/messages"));
var validator_1 = require("../helper/validator");
var tsyringe_1 = require("tsyringe");
var FileType = require("file-type");
var config = require("../config/configurations");
var CourseImageController = (function () {
    function CourseImageController(courseImageService, validator) {
        var _this = this;
        this.courseImageService = courseImageService;
        this.validator = validator;
        this.getImage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, filePath, options, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.courseImageService.get(id)];
                    case 2:
                        _a = _b.sent(), filePath = _a.filePath, options = _a.options;
                        res.sendFile(filePath, options);
                        return [3, 4];
                    case 3:
                        err_1 = _b.sent();
                        next(new errorResponse_1.ErrorResponse(err_1, err_1 === null || err_1 === void 0 ? void 0 : err_1.errno));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        this.updateImage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var file, id, mime, respone, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = req.files.file;
                        id = req.params.id;
                        return [4, FileType.fromFile(file === null || file === void 0 ? void 0 : file.tempFilePath)];
                    case 1:
                        mime = (_a.sent()).mime;
                        this.validator
                            .reset()
                            .isNull(file, "errMessage", messages.requiredFile)
                            .isIncluded(mime, config.ALLOWED_FILES.IMAGES, "errMessage", messages.invalidFile)
                            .isValidSize(file.size, config.MAX_SIZE.IMAGES, "errMessage", messages.invalidFileSize);
                        if (this.validator.invalid()) {
                            return [2, next(new errorResponse_1.ErrorResponse(this.validator.errors(), 400))];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this.courseImageService.update(file.tempFilePath, mime, id)];
                    case 3:
                        respone = _a.sent();
                        res.status(respone.statusCode).json(respone.object);
                        return [3, 5];
                    case 4:
                        err_2 = _a.sent();
                        next(new errorResponse_1.ErrorResponse(err_2, err_2 === null || err_2 === void 0 ? void 0 : err_2.errno));
                        return [3, 5];
                    case 5: return [2];
                }
            });
        }); };
        this.deleteImage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, respone, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.courseImageService.delete(id)];
                    case 2:
                        respone = _a.sent();
                        res.status(respone.statusCode).json(respone.object);
                        return [3, 4];
                    case 3:
                        err_3 = _a.sent();
                        next(new errorResponse_1.ErrorResponse(err_3, err_3 === null || err_3 === void 0 ? void 0 : err_3.errno));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        this.truncateImage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.courseImageService.truncate(id)];
                    case 2:
                        _a.sent();
                        next();
                        return [3, 4];
                    case 3:
                        err_4 = _a.sent();
                        next(new errorResponse_1.ErrorResponse(err_4, err_4 === null || err_4 === void 0 ? void 0 : err_4.errno));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
    }
    CourseImageController = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [courseImageService_1.CourseImageService,
            validator_1.Validator])
    ], CourseImageController);
    return CourseImageController;
}());
exports.CourseImageController = CourseImageController;
