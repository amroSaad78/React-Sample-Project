"use strict";
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
exports.UserService = void 0;
var errors_1 = require("../constants/errors");
var successResponse_1 = require("../helper/successResponse");
var repository_1 = require("../repository/repository");
var tsyringe_1 = require("tsyringe");
var User_1 = require("../entities/User");
var server_1 = require("../server");
var typeorm_1 = require("typeorm");
var config = require("../config/configurations");
var UserService = (function () {
    function UserService(repo) {
        var _this = this;
        this.repo = repo;
        this.namespace = "UserService";
        this.create = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var existingUser, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.repo.findOne(User_1.User, { email: user.email })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser)
                            throw { errMessage: errors_1.dublicatedEmail, errno: 400 };
                        return [4, this.repo.save(user)];
                    case 2:
                        user = _a.sent();
                        return [2, new successResponse_1.SuccessResponse({ id: user.id }, 201)];
                    case 3:
                        err_1 = _a.sent();
                        err_1.message && server_1.log.error("".concat(err_1.message, " | ").concat(this.namespace));
                        throw err_1;
                    case 4: return [2];
                }
            });
        }); };
        this.update = function (id, name, email, password, tel, identity, role) { return __awaiter(_this, void 0, void 0, function () {
            var user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.repo.findOne(User_1.User, { id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        user.email = email;
                        user.name = name;
                        user.role = role;
                        user.tel = tel;
                        user.identity = identity;
                        user.encryptPassword(password);
                        return [4, this.repo.save(user)];
                    case 2:
                        _a.sent();
                        return [2, new successResponse_1.SuccessResponse({ id: user.id }, 200)];
                    case 3:
                        err_2 = _a.sent();
                        err_2.message && server_1.log.error("".concat(err_2.message, " | ").concat(this.namespace));
                        throw err_2;
                    case 4: return [2];
                }
            });
        }); };
        this.del = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var affected, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repo.delete(User_1.User, id)];
                    case 1:
                        affected = _a.sent();
                        return [2, new successResponse_1.SuccessResponse({ affected: affected }, 202)];
                    case 2:
                        err_3 = _a.sent();
                        err_3.message && server_1.log.error("".concat(err_3.message, " | ").concat(this.namespace));
                        throw err_3;
                    case 3: return [2];
                }
            });
        }); };
        this.get = function (pageNo, skip, criteria) { return __awaiter(_this, void 0, void 0, function () {
            var relation, filter, projection, count, users, pageSize, pages, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = criteria ? "%".concat(criteria, "%") : "%";
                        relation = {};
                        filter = [{ name: (0, typeorm_1.Like)(criteria) }, { email: (0, typeorm_1.Like)(criteria) }];
                        projection = {
                            id: true,
                            tel: true,
                            role: true,
                            name: true,
                            email: true,
                            isActive: true,
                            identity: true,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, this.repo.count(User_1.User, filter, relation)];
                    case 2:
                        count = _a.sent();
                        return [4, this.repo.get(User_1.User, pageNo, projection, filter, relation, skip)];
                    case 3:
                        users = _a.sent();
                        pageSize = parseInt(config.PAGE_SIZE);
                        pages = Math.ceil(count / pageSize) - 1;
                        return [2, new successResponse_1.SuccessResponse({ users: users, next: pageNo < pages ? pageNo + 1 : pages }, 200)];
                    case 4:
                        err_4 = _a.sent();
                        err_4.message && server_1.log.error("".concat(err_4.message, " | ").concat(this.namespace));
                        throw err_4;
                    case 5: return [2];
                }
            });
        }); };
        this.toggle = function (id, isActive) { return __awaiter(_this, void 0, void 0, function () {
            var existingUser, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.repo.findOne(User_1.User, { id: id })];
                    case 1:
                        existingUser = _a.sent();
                        if (!existingUser)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        existingUser.isActive = !isActive;
                        return [4, this.repo.save(existingUser)];
                    case 2:
                        existingUser = _a.sent();
                        return [2, new successResponse_1.SuccessResponse({}, 204)];
                    case 3:
                        err_5 = _a.sent();
                        err_5.message && server_1.log.error("".concat(err_5.message, " | ").concat(this.namespace));
                        throw err_5;
                    case 4: return [2];
                }
            });
        }); };
        this.basic = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var relation, filter, projection, user, newMessages, err_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        relation = { messages: true };
                        filter = { id: id };
                        projection = {
                            id: true,
                            role: true,
                            messages: {
                                id: true,
                                isNew: true,
                            },
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.repo.getOne(User_1.User, projection, filter, relation)];
                    case 2:
                        user = _b.sent();
                        if (!user)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        newMessages = (_a = user.messages) === null || _a === void 0 ? void 0 : _a.filter(function (m) { return m.isNew === true; }).length;
                        return [2, new successResponse_1.SuccessResponse({
                                userRole: user === null || user === void 0 ? void 0 : user.role,
                                imageURL: "pics/user/".concat(user === null || user === void 0 ? void 0 : user.id),
                                newMessages: newMessages,
                            }, 200)];
                    case 3:
                        err_6 = _b.sent();
                        err_6.message && server_1.log.error("".concat(err_6.message, " | ").concat(this.namespace));
                        throw err_6;
                    case 4: return [2];
                }
            });
        }); };
    }
    UserService = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [repository_1.DBRepository])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
