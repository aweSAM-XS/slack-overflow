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
exports.confirmEmail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DatabaseHelper_1 = require("../DatabaseHelper");
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        if (!token) {
            return res.status(401).json({ message: 'Invalid Link' });
        }
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        yield DatabaseHelper_1.DatabaseHelper.query(`UPDATE Users SET approved=1 WHERE id='${id}'`);
        return res
            .status(200)
            .json({ message: 'Email confirmed successfully' });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: 'Something went wrong confirming email', error });
    }
});
exports.confirmEmail = confirmEmail;
