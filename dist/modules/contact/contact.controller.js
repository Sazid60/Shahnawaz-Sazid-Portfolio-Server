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
exports.ContactController = void 0;
const sendEmail_1 = require("../../utils/sendEmail");
const sendContactEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, message } = req.body;
        if (!(name === null || name === void 0 ? void 0 : name.trim()) || !(email === null || email === void 0 ? void 0 : email.trim()) || !(message === null || message === void 0 ? void 0 : message.trim())) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required",
            });
        }
        if (!process.env.SMTP_USER) {
            return res.status(500).json({
                success: false,
                message: "Receiver email is not configured",
            });
        }
        yield (0, sendEmail_1.sendEmail)({
            to: process.env.SMTP_USER,
            subject: `New Contact Request from ${name}`,
            templateName: "contact-owner",
            templateData: { name, email, phone, message },
        });
        yield (0, sendEmail_1.sendEmail)({
            to: email,
            subject: "Thank you for contacting!",
            templateName: "contact-user",
            templateData: { name, email, message },
        });
        res.status(200).json({
            success: true,
            message: "Emails sent successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
});
exports.ContactController = {
    sendContactEmail,
};
