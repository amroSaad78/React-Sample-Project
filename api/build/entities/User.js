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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var mediaModel_1 = require("../repository/mediaModel");
var getUTCDate = require("../helper/getUTCDate");
var enums_1 = require("../constants/enums");
var SubCourse_1 = require("./SubCourse");
var Message_1 = require("./Message");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getVerificationCode = function () { return _this.verificationCode; };
        _this.getCodeExpiration = function () { return _this.codeExpiration; };
        _this.getPassword = function () { return _this.password; };
        return _this;
    }
    User.prototype.encryptPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, bcrypt.genSalt(12)];
                    case 1:
                        salt = _b.sent();
                        _a = this;
                        return [4, bcrypt.hash(password ? password : this.password, salt)];
                    case 2:
                        _a.password = _b.sent();
                        return [2];
                }
            });
        });
    };
    User.prototype.setVerificationCode = function () {
        this.verificationCode = crypto.randomBytes(6).toString("hex");
    };
    User.prototype.setCodeExpiration = function () {
        this.codeExpiration = getUTCDate(1, 0, 0);
    };
    __decorate([
        (0, typeorm_1.Column)({ type: "nvarchar", length: 50, nullable: false }),
        __metadata("design:type", Object)
    ], User.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false, unique: true }),
        __metadata("design:type", Object)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 100, nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "nvarchar", length: 11, nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "tel", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "nvarchar", length: 10, nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "identity", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bool", default: true }),
        __metadata("design:type", Object)
    ], User.prototype, "isActive", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "bool", default: false }),
        __metadata("design:type", Object)
    ], User.prototype, "isVerified", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "enum", enum: enums_1.Roles, default: enums_1.Roles.TRAINEE }),
        __metadata("design:type", Object)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "nvarchar", length: 12, nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "verificationCode", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "datetime", nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "codeExpiration", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Message_1.Message; }, function (message) { return message.user; }),
        __metadata("design:type", Object)
    ], User.prototype, "messages", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return SubCourse_1.SubCourse; }, function (subCourse) { return subCourse.users; }),
        (0, typeorm_1.JoinTable)(),
        __metadata("design:type", Object)
    ], User.prototype, "subcourses", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)({ name: "users" })
    ], User);
    return User;
}(mediaModel_1.MediaModel));
exports.User = User;
