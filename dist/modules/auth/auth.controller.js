"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const loginWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield auth_service_1.AuthServices.loginWithEmailAndPassword(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        if (error.message === "User Not Found!") {
            return res.status(404).json({ success: false, message: error.message });
        }
        if (error.message === "Password Incorrect!") {
            return res.status(401).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: "Something went wrong!", error: error.message });
    }
});
exports.AuthController = {
    loginWithEmailAndPassword
};
