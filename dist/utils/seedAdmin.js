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
exports.seedAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const bcryptSalt = 10;
        const existingAdmin = yield db_1.prisma.user.findUnique({
            where: { email: adminEmail },
        });
        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }
        console.log("Creating admin...");
        const hashedPassword = yield bcryptjs_1.default.hash(adminPassword, bcryptSalt);
        yield db_1.prisma.user.create({
            data: {
                name: "Shahnawaz Sazid",
                email: adminEmail,
                password: hashedPassword,
                phone: "+8801639768727",
                image: "https://res.cloudinary.com/dosvjludu/image/upload/v1759246773/6xpy6rva0lo-1759246773033-sazid-jpg.jpg.jpg",
                role: "ADMIN",
            },
        });
        console.log("Admin created successfully!");
    }
    catch (error) {
        console.error("Failed to create admin:", error);
    }
    finally {
        yield db_1.prisma.$disconnect();
    }
});
exports.seedAdmin = seedAdmin;
if (require.main === module) {
    (0, exports.seedAdmin)();
}
