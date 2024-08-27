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
exports.SubCourseMessageService = void 0;
var successResponse_1 = require("../helper/successResponse");
var repository_1 = require("../repository/repository");
var errors_1 = require("../constants/errors");
var SubCourse_1 = require("../entities/SubCourse");
var Message_1 = require("../entities/Message");
var tsyringe_1 = require("tsyringe");
var server_1 = require("../server");
var SubCourseMessageService = (function () {
    function SubCourseMessageService(subCourseRepo, messageRepo) {
        var _this = this;
        this.subCourseRepo = subCourseRepo;
        this.messageRepo = messageRepo;
        this.namespace = "SubCourseMessageService";
        this.create = function (subject, details, subCourseId, senderId) { return __awaiter(_this, void 0, void 0, function () {
            var filter, relation, projection, subCourse, err_1;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filter = { id: subCourseId };
                        relation = { users: { messages: true } };
                        projection = { id: true, users: true };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4, this.subCourseRepo.getOne(SubCourse_1.SubCourse, projection, filter, relation)];
                    case 2:
                        subCourse = _b.sent();
                        if (!subCourse)
                            throw { errMessage: errors_1.requestError, errno: 400 };
                        (_a = subCourse.users) === null || _a === void 0 ? void 0 : _a.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var message;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        message = new Message_1.Message();
                                        message.subject = subject;
                                        message.details = details;
                                        message.senderId = senderId;
                                        message.user = user;
                                        return [4, this.messageRepo.save(message)];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); });
                        return [2, new successResponse_1.SuccessResponse({}, 200)];
                    case 3:
                        err_1 = _b.sent();
                        err_1.message && server_1.log.error("".concat(err_1.message, " | ").concat(this.namespace));
                        throw err_1;
                    case 4: return [2];
                }
            });
        }); };
    }
    SubCourseMessageService = __decorate([
        (0, tsyringe_1.autoInjectable)(),
        __metadata("design:paramtypes", [repository_1.DBRepository,
            repository_1.DBRepository])
    ], SubCourseMessageService);
    return SubCourseMessageService;
}());
exports.SubCourseMessageService = SubCourseMessageService;
