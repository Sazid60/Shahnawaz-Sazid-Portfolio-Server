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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = void 0;
const db_1 = require("../../config/db");
const axios_1 = __importDefault(require("axios"));
const createResume = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.resume.create({ data });
});
const getFirstResume = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.resume.findFirst({});
});
const updateResume = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.resume.update({
        where: { id },
        data: updates,
        include: { user: true },
    });
});
const deleteResume = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.resume.delete({ where: { id } });
});
const getResumeFileStream = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(url, { responseType: "stream" });
    return response.data;
});
exports.ResumeService = {
    createResume,
    getFirstResume,
    updateResume,
    deleteResume,
    getResumeFileStream,
};
