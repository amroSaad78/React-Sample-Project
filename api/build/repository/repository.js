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
exports.DBRepository = void 0;
var server_1 = require("../server");
var tsyringe_1 = require("tsyringe");
var config = require("../config/configurations");
var DBRepository = (function () {
    function DBRepository() {
        var _this = this;
        this.save = function (item) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, server_1.DBSource.manager.save(item)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2];
                }
            });
        }); };
        this.delete = function (entity, id) { return __awaiter(_this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, server_1.DBSource.manager.delete(entity, id)];
                    case 1: return [2, _a.sent()];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2];
                }
            });
        }); };
        this.update = function (entity, criteria, query) { return __awaiter(_this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, server_1.DBSource.manager.update(entity, criteria, query)];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2];
                }
            });
        }); };
        this.findOne = function (entity, filter) { return __awaiter(_this, void 0, void 0, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, server_1.DBSource.manager.findOne(entity, { where: filter })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2];
                }
            });
        }); };
        this.count = function (entity, filter, relation) { return __awaiter(_this, void 0, void 0, function () {
            var err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, server_1.DBSource.manager.count(entity, {
                                where: filter,
                                relations: relation,
                            })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        err_5 = _a.sent();
                        throw err_5;
                    case 3: return [2];
                }
            });
        }); };
        this.get = function (entity, pageNo, projection, filter, relation, skip) {
            if (skip === void 0) { skip = 0; }
            return __awaiter(_this, void 0, void 0, function () {
                var pageSize, err_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            pageSize = parseInt(config.PAGE_SIZE);
                            skip = pageNo * pageSize < skip ? 0 : skip;
                            return [4, server_1.DBSource.manager.find(entity, {
                                    skip: pageNo * pageSize - skip,
                                    take: pageSize,
                                    relations: relation,
                                    select: projection,
                                    where: filter,
                                })];
                        case 1: return [2, _a.sent()];
                        case 2:
                            err_6 = _a.sent();
                            throw err_6;
                        case 3: return [2];
                    }
                });
            });
        };
        this.getOne = function (entity, projection, filter, relation) { return __awaiter(_this, void 0, void 0, function () {
            var err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, server_1.DBSource.manager.findOne(entity, {
                                relations: relation,
                                select: projection,
                                where: filter,
                            })];
                    case 1: return [2, _a.sent()];
                    case 2:
                        err_7 = _a.sent();
                        throw err_7;
                    case 3: return [2];
                }
            });
        }); };
    }
    DBRepository = __decorate([
        (0, tsyringe_1.injectable)(),
        (0, tsyringe_1.scoped)(tsyringe_1.Lifecycle.ContainerScoped),
        __metadata("design:paramtypes", [])
    ], DBRepository);
    return DBRepository;
}());
exports.DBRepository = DBRepository;
