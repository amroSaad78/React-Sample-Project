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
exports.GoogleService = void 0;
var errors_1 = require("../constants/errors");
var successResponse_1 = require("../helper/successResponse");
var repository_1 = require("../repository/repository");
var googleClient_1 = require("../helper/googleClient");
var baseImageService_1 = require("./baseImageService");
var blobService_1 = require("./blobService");
var tsyringe_1 = require("tsyringe");
var User_1 = require("../entities/User");
var mailer_1 = require("./mailer");
var server_1 = require("../server");
var getToken = require("../helper/getToken");
var config = require("../config/configurations");
var GoogleService = (function (_super) {
    __extends(GoogleService, _super);
    function GoogleService(repo, blob, mailer) {
        var _this = _super.call(this, repo, blob, "GoogleService") || this;
        _this.mailer = mailer;
        _this.google = function (token) { return __awaiter(_this, void 0, void 0, function () {
            var existingUser, ticket, _a, name, email, picture, email_verified, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4, googleClient_1.GoogleClient.getInstance().verifyIdToken({
                                idToken: token,
                                audience: config.GOOGLE.clientID,
                            })];
                    case 1:
                        ticket = _b.sent();
                        _a = ticket.getPayload(), name = _a.name, email = _a.email, picture = _a.picture, email_verified = _a.email_verified;
                        if (!name || !email || !email_verified)
                            throw { errMessage: errors_1.googleAccount, errno: 401 };
                        return [4, this.repo.findOne(User_1.User, { email: email })];
                    case 2:
                        existingUser = _b.sent();
                        if (!!existingUser) return [3, 4];
                        existingUser = new User_1.User();
                        existingUser.name = name;
                        existingUser.email = email;
                        existingUser.isVerified = email_verified;
                        existingUser.setVerificationCode();
                        existingUser.setCodeExpiration();
                        return [4, this.repo.save(existingUser)];
                    case 3:
                        existingUser = _b.sent();
                        this.blob.emitDownload(this.namespace, "".concat(config.BLOB.root, "/").concat(config.BLOB.user), existingUser.id, User_1.User, picture);
                        _b.label = 4;
                    case 4:
                        if (!existingUser.isActive)
                            throw { errMessage: errors_1.authentication, errno: 401 };
                        token = getToken(existingUser);
                        return [2, new successResponse_1.SuccessResponse({ token: token }, 200)];
                    case 5:
                        err_1 = _b.sent();
                        err_1.message && server_1.log.error("".concat(err_1.message, " | ").concat(this.namespace));
                        throw err_1;
                    case 6: return [2];
                }
            });
        }); };
        _this.mailer.on("send", function (options, namespace) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.mailer.send(options, namespace)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        return _this;
    }
    GoogleService = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [repository_1.DBRepository,
            blobService_1.BlobService,
            mailer_1.Mailer])
    ], GoogleService);
    return GoogleService;
}(baseImageService_1.BaseImageService));
exports.GoogleService = GoogleService;
