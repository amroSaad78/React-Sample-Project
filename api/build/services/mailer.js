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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mailer = void 0;
var messages_1 = require("../constants/messages");
var tsyringe_1 = require("tsyringe");
var events_1 = __importDefault(require("events"));
var server_1 = require("../server");
var config = require("../config/configurations");
var nodemailer = require("nodemailer");
var Mailer = (function (_super) {
    __extends(Mailer, _super);
    function Mailer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getVerficationOptions = function (user) {
            var options = {
                to: user.email,
                subject: messages_1.emailSubject,
                html: "<p style=\"direction: rtl; font-size: x-large;\">\n          ".concat(config.MAILER.centerName, "<br>\n          \u0627\u0644\u0643\u0640\u0648\u062F \u0627\u0644\u062E\u0640\u0627\u0635 \u0628\u0643 \u0647\u0648 \n          <span style=\"color: blue;\">").concat(user.getVerificationCode(), "</span><br>\n          \u0647\u0630\u0627 \u0627\u0644\u0643\u0648\u062F \u0635\u0627\u0644\u062D \u0644\u0645\u062F\u0629 \u0633\u0627\u0639\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637.</p>"),
            };
            return options;
        };
        _this.sendEmail = function (options, namespace) {
            return _this.emit("send", options, namespace);
        };
        return _this;
    }
    Mailer.prototype.send = function (options, namespace) {
        return __awaiter(this, void 0, void 0, function () {
            var transporter, mailOptions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transporter = nodemailer.createTransport(config.MAILER_TRANSPORTER);
                        mailOptions = {
                            from: config.MAILER.from,
                            to: options.to,
                            subject: options.subject,
                            html: options.html,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, transporter.sendMail(mailOptions)];
                    case 2:
                        _a.sent();
                        return [2, true];
                    case 3:
                        err_1 = _a.sent();
                        server_1.log.error("".concat(err_1.message, " | ").concat(namespace));
                        return [2, false];
                    case 4: return [2];
                }
            });
        });
    };
    Mailer = __decorate([
        (0, tsyringe_1.injectable)()
    ], Mailer);
    return Mailer;
}(events_1.default));
exports.Mailer = Mailer;
