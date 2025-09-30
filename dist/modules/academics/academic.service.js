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
exports.AcademicService = void 0;
const db_1 = require("../../config/db");
const createAcademic = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.academic.create({ data: payload });
});
const getAllAcademics = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.academic.findMany({ orderBy: { createdAt: "desc" } });
});
const getAcademicById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.academic.findUnique({ where: { id } });
});
const updateAcademic = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.academic.update({ where: { id }, data: updates });
});
const deleteAcademic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.academic.delete({ where: { id } });
});
exports.AcademicService = {
    createAcademic,
    getAllAcademics,
    getAcademicById,
    updateAcademic,
    deleteAcademic,
};
