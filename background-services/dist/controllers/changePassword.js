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
exports.changePassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const DatabaseHelper_1 = require("../DatabaseHelper");
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(401).json({ message: 'Invalid or broken link' });
        }
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const hashedPassword = yield bcrypt_1.default.hash('abracadabra', 10);
        yield DatabaseHelper_1.DatabaseHelper.query(`UPDATE Users SET password='${hashedPassword}' WHERE id='${id}'`);
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (error) {
        return res
            .status(200)
            .json({ message: 'Something went wrong reseting your password' });
    }
});
exports.changePassword = changePassword;
