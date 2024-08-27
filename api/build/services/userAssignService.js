"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserAssignService = void 0;
var successResponse_1 = require("../helper/successResponse");
var repository_1 = require("../repository/repository");
var errors_1 = require("../constants/errors");
var SubCourse_1 = require("../entities/SubCourse");
var enums_1 = require("../constants/enums");
var tsyringe_1 = require("tsyringe");
var User_1 = require("../entities/User");
var typeorm_1 = require("typeorm");
var server_1 = require("../server");
var config = require("../config/configurations");
var UserAssignService = (function () {
    function UserAssignService(userRepo, subCourseRepo) {
        var _this = this;
        this.userRepo = userRepo;
        this.subCourseRepo = subCourseRepo;
        this.namespace = "UserAssignService";
        this.get = function (pageNo, subCourseId, criteria) { return __awaiter(_this, void 0, void 0, function () {
            var filter, projection, count, result, users, pageSize, pages, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        criteria = criteria ? "%".concat(criteria, "%") : "%";
                        filter = [
                            { name: (0, typeorm_1.Like)(criteria), role: (0, typeorm_1.Not)(enums_1.Roles.ADMIN) },
                            { email: (0, typeorm_1.Like)(criteria), role: (0, typeorm_1.Not)(enums_1.Roles.ADMIN) },
                        ];
                        projection = {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            isActive: true,
                            subcourses: { id: true },
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, this.userRepo.count(User_1.User, filter, {})];
                    case 2:
                        count = _a.sent();
                        return [4, this.userRepo.get(User_1.User, pageNo, projection, filter, {
                                subcourses: true,
                            })];
                    case 3:
                        result = _a.sent();
                        users = result.map(function (user) {
                            var subCourses = user.subcourses;
                            delete user.subcourses;
                            return (subCourses === null || subCourses === void 0 ? void 0 : subCourses.find(function (sub) { return sub.id === subCourseId; }))
                                ? __assign(__assign({}, user), { checked: true }) : __assign(__assign({}, user), { checked: false });
                        });
                        pageSize = parseInt(config.PAGE_SIZE);
                        pages = Math.ceil(count / pageSize) - 1;
                        return [2, new successResponse_1.SuccessResponse({ users: users, next: pageNo < pages ? pageNo + 1 : pages }, 200)];
                    case 4:
                        err_1 = _a.sent();
                        err_1.message && server_1.log.error("".concat(err_1.message, " | ").concat(this.namespace));
                        throw err_1;
                    case 5: return [2];
                }
            });
        }); };
        this.toggle = function (userId, subCourseId, checked) { return __awaiter(_this, void 0, void 0, function () {
            var user, subCourse, isExist, err_2;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        return [4, this.userRepo.getOne(User_1.User, { id: true, subcourses: { id: true } }, { id: userId }, { subcourses: true })];
                    case 1:
                        user = _d.sent();
                        return [4, this.subCourseRepo.findOne(SubCourse_1.SubCourse, {
                                id: subCourseId,
                            })];
                    case 2:
                        subCourse = _d.sent();
                        if (!user || !subCourse)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        isExist = (_a = user.subcourses) === null || _a === void 0 ? void 0 : _a.find(function (s) { return s.id === subCourseId; });
                        if ((checked && isExist) || (!checked && !isExist)) {
                            return [2, new successResponse_1.SuccessResponse({}, 200)];
                        }
                        if (!(checked && !isExist)) return [3, 4];
                        (_b = user.subcourses) === null || _b === void 0 ? void 0 : _b.push(subCourse);
                        return [4, this.userRepo.save(user)];
                    case 3:
                        _d.sent();
                        return [2, new successResponse_1.SuccessResponse({}, 200)];
                    case 4:
                        user.subcourses = (_c = user.subcourses) === null || _c === void 0 ? void 0 : _c.filter(function (s) { return s.id !== subCourseId; });
                        return [4, this.userRepo.save(user)];
                    case 5:
                        _d.sent();
                        return [2, new successResponse_1.SuccessResponse({}, 200)];
                    case 6:
                        err_2 = _d.sent();
                        err_2.message && server_1.log.error("".concat(err_2.message, " | ").concat(this.namespace));
                        throw err_2;
                    case 7: return [2];
                }
            });
        }); };
    }
    UserAssignService = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [repository_1.DBRepository,
            repository_1.DBRepository])
    ], UserAssignService);
    return UserAssignService;
}());
exports.UserAssignService = UserAssignService;
