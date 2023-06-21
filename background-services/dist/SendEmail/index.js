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
exports.sendAnswerAcceptedEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendMail = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const DatabaseHelper_1 = require("../DatabaseHelper");
const ejs_1 = __importDefault(require("ejs"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
let config = {
    host: 'smtp.google.com',
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PWD,
    },
};
const createTransporter = (config) => {
    return nodemailer_1.default.createTransport(config);
};
const sendMail = (mailOptions, purpose) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = createTransporter(config);
    yield transporter.verify();
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error Sending ${purpose} Email:`, error);
        }
        else {
            console.log(`${purpose} Email Sent:`, info.response);
        }
    });
});
exports.sendMail = sendMail;
const sendWelcomeEmail = (users) => __awaiter(void 0, void 0, void 0, function* () {
    for (let user of users) {
        const token = jsonwebtoken_1.default.sign({ id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        ejs_1.default.renderFile('templates/welcome.ejs', {
            username: user.username,
            link: `http://localhost:8008/confirm-email/${token}`,
            appURL: 'https://overflow.awesam.tech/login',
        }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                console.log(error.message);
                return error;
            }
            else {
                try {
                    const message = {
                        from: process.env.EMAIL,
                        to: user.email,
                        subject: 'Welcome to our Site',
                        html,
                    };
                    yield (0, exports.sendMail)(message, 'Welcome');
                    yield DatabaseHelper_1.DatabaseHelper.query(`UPDATE Users SET email_sent ='1' WHERE user_id ='${user.user_id}'`);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }));
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = (users) => __awaiter(void 0, void 0, void 0, function* () {
    for (let user of users) {
        const token = jsonwebtoken_1.default.sign({ id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        ejs_1.default.renderFile('templates/reset.ejs', {
            name: user.username,
            resetLink: `http://localhost:8008/reset-password/${token}`,
        }, (error, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return error;
            }
            else {
                try {
                    const message = {
                        from: process.env.EMAIL,
                        to: user.email,
                        subject: 'You requested a password reset',
                        html,
                    };
                    yield (0, exports.sendMail)(message, 'Password Reset');
                    yield DatabaseHelper_1.DatabaseHelper.query(`UPDATE Users SET passwordResetRequested=0 WHERE id ='${user.user_id}'`);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }));
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendAnswerAcceptedEmail = (answers) => __awaiter(void 0, void 0, void 0, function* () {
    for (let answer of answers) {
        ejs_1.default.renderFile('templates/answerAccepted.ejs', { username: answer.username, question_title: answer.question_title, asker: answer.question_username }, (err, html) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                return;
            }
            try {
                let message = {
                    from: process.env.EMAIL,
                    to: answer.email,
                    subject: 'Congrats! ',
                    html,
                };
                yield (0, exports.sendMail)(message, 'Answer Accepted');
                DatabaseHelper_1.DatabaseHelper.query(`UPDATE Answers SET email_sent=1 WHERE user_id='${answer.user_id}' and answer_id='${answer.answer_id}'`);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.sendAnswerAcceptedEmail = sendAnswerAcceptedEmail;
