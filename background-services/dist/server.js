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
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const SendEmail_1 = require("./SendEmail");
const DatabaseHelper_1 = require("./DatabaseHelper");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use('/confirm-email', routes_1.emailRoute);
app.use('/reset-password', routes_1.passwordRoute);
node_cron_1.default.schedule('*/15 * * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Watching DB 👀');
    // send welcome email
    const newUsers = (yield DatabaseHelper_1.DatabaseHelper.query(`SELECT * FROM Users WHERE email_sent=0
  `)).recordset;
    (0, SendEmail_1.sendWelcomeEmail)(newUsers);
    // send password reset email
    const resetPasswordRequests = (yield DatabaseHelper_1.DatabaseHelper.query(`SELECT * FROM Users WHERE passwordResetRequested=1
  `)).recordset;
    (0, SendEmail_1.sendPasswordResetEmail)(resetPasswordRequests);
    // send password reset email
    const acceptedAnswers = (yield DatabaseHelper_1.DatabaseHelper.exec(`GetAcceptedAnswers`)).recordset;
    (0, SendEmail_1.sendAnswerAcceptedEmail)(acceptedAnswers);
}));
app.listen(8008, () => {
    console.log('App is Running');
});
