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
exports.RedeemPasswordService = void 0;
var successResponse_1 = require("../helper/successResponse");
var repository_1 = require("../repository/repository");
var errors = __importStar(require("../constants/errors"));
var tsyringe_1 = require("tsyringe");
var User_1 = require("../entities/User");
var mailer_1 = require("./mailer");
var server_1 = require("../server");
var getUTCDate = require("../helper/getUTCDate");
var getToken = require("../helper/getToken");
var RedeemPasswordService = (function () {
    function RedeemPasswordService(repo, mailer) {
        var _this = this;
        this.repo = repo;
        this.mailer = mailer;
        this.namespace = "RedeemPasswordService";
        this.request = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var existingUser, options, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.repo.findOne(User_1.User, { email: email })];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser)
                            throw { errMessage: errors.notFoundEmail, errno: 404 };
                        if (!existingUser.isActive) {
                            throw { errMessage: errors.authentication, errno: 401 };
                        }
                        existingUser.setVerificationCode();
                        existingUser.setCodeExpiration();
                        return [4, this.repo.update(User_1.User, { id: existingUser.id }, {
                                verificationCode: existingUser.getVerificationCode(),
                                codeExpiration: existingUser.getCodeExpiration(),
                            })];
                    case 2:
                        _a.sent();
                        options = this.mailer.getVerficationOptions(existingUser);
                        this.mailer.sendEmail(options, this.namespace);
                        return [2, new successResponse_1.SuccessResponse({}, 200)];
                    case 3:
                        err_1 = _a.sent();
                        server_1.log.error("".concat(err_1.message, " | ").concat(this.namespace));
                        throw err_1;
                    case 4: return [2];
                }
            });
        }); };
        this.verify = function (email, code) { return __awaiter(_this, void 0, void 0, function () {
            var existingUser, expirationDate, currentDate, token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.repo.findOne(User_1.User, { email: email })];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser)
                            throw { errMessage: errors.notFoundEmail, errno: 404 };
                        if (!existingUser.isActive) {
                            throw { errMessage: errors.authentication, errno: 401 };
                        }
                        expirationDate = existingUser.getCodeExpiration();
                        currentDate = getUTCDate(0, 0, 0);
                        if (expirationDate && currentDate > expirationDate) {
                            throw { errMessage: errors.expiredCode, errno: 400 };
                        }
                        if (existingUser.getVerificationCode() != code) {
                            throw { errMessage: errors.codeError, errno: 400 };
                        }
                        if (!!existingUser.isVerified) return [3, 3];
                        return [4, this.repo.update(User_1.User, { id: existingUser.id }, {
                                isVerified: true,
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        token = getToken(existingUser);
                        return [2, new successResponse_1.SuccessResponse({ token: token }, 200)];
                    case 4:
                        err_2 = _a.sent();
                        err_2.message && server_1.log.error("".concat(err_2.message, " | ").concat(this.namespace));
                        throw err_2;
                    case 5: return [2];
                }
            });
        }); };
        this.mailer.on("send", function (options, namespace) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mailer.send(options, namespace)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    }
    RedeemPasswordService = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [repository_1.DBRepository, mailer_1.Mailer])
    ], RedeemPasswordService);
    return RedeemPasswordService;
}());
exports.RedeemPasswordService = RedeemPasswordService;
