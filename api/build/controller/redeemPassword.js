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
exports.RedeemPasswordController = void 0;
var redeemPasswordService_1 = require("../services/redeemPasswordService");
var errorResponse_1 = require("../helper/errorResponse");
var errors_1 = require("../constants/errors");
var messages = __importStar(require("../constants/messages"));
var validator_1 = require("../helper/validator");
var decoder_1 = require("../helper/decoder");
var tsyringe_1 = require("tsyringe");
var RedeemPasswordController = (function () {
    function RedeemPasswordController(redeemPasswordService, validator, decoder) {
        var _this = this;
        this.redeemPasswordService = redeemPasswordService;
        this.validator = validator;
        this.decoder = decoder;
        this.codeRequest = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var email, respone, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = req.body.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        email = this.decoder.decode(email);
                        this.validator
                            .reset()
                            .isValidEmail(email, "emailErr", messages.invalidEmail)
                            .required(email, "emailErr", messages.requiredEmail);
                        if (this.validator.invalid()) {
                            this.validator.set("errMessage", errors_1.requestError);
                            return [2, next(new errorResponse_1.ErrorResponse(this.validator.errors(), 400))];
                        }
                        return [4, this.redeemPasswordService.request(email.trim().toLowerCase())];
                    case 2:
                        respone = _a.sent();
                        res.status(respone.statusCode).json(respone.object);
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        next(new errorResponse_1.ErrorResponse(err_1, err_1 === null || err_1 === void 0 ? void 0 : err_1.errno));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
        this.verifyCode = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, code, respone, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, code = _a.code;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        email = this.decoder.decode(email);
                        code = this.decoder.decode(code);
                        this.validator
                            .reset()
                            .isValidEmail(email, "errMessage", messages.invalidEmail)
                            .required(email, "errMessage", messages.requiredEmail)
                            .required(code, "codeErr", messages.requiredVerfCode);
                        if (this.validator.invalid()) {
                            return [2, next(new errorResponse_1.ErrorResponse(this.validator.errors(), 400))];
                        }
                        return [4, this.redeemPasswordService.verify(email.trim().toLowerCase(), code.trim())];
                    case 2:
                        respone = _b.sent();
                        res.status(respone.statusCode).json(respone.object);
                        return [3, 4];
                    case 3:
                        err_2 = _b.sent();
                        next(new errorResponse_1.ErrorResponse(err_2, err_2 === null || err_2 === void 0 ? void 0 : err_2.errno));
                        return [3, 4];
                    case 4: return [2];
                }
            });
        }); };
    }
    RedeemPasswordController = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [redeemPasswordService_1.RedeemPasswordService,
            validator_1.Validator,
            decoder_1.Decoder])
    ], RedeemPasswordController);
    return RedeemPasswordController;
}());
exports.RedeemPasswordController = RedeemPasswordController;
