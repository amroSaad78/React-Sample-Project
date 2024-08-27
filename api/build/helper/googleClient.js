"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleClient = void 0;
var OAuth2Client = require("google-auth-library").OAuth2Client;
var config = require("../config/configurations");
var GoogleClient = (function () {
    function GoogleClient() {
        throw new Error("Cannot initialize singleton class using new. Use OauthClient.getInstance instead");
    }
    var _a;
    _a = GoogleClient;
    GoogleClient.getInstance = function () {
        if (!GoogleClient.instance) {
            try {
                _a.instance = new OAuth2Client(config.GOOGLE.clientID);
            }
            catch (err) {
                throw err;
            }
        }
        return GoogleClient.instance;
    };
    return GoogleClient;
}());
exports.GoogleClient = GoogleClient;
