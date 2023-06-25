import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { DatabaseHelper } from '../DatabaseHelper';
import ejs from 'ejs';
import { User, MailConfig, MailOptions, AcceptedAnswer } from '../interfaces';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// let config: MailConfig = {
//     host: 'smtp.google.com',
//     service: 'gmail',
//     port: 587,
//     auth: {
//         user: process.env.EMAIL as string,
//         pass: process.env.EMAIL_PWD as string,
//     },
// };

let config: MailConfig = {
    host: 'smtp.zoho.com',
    port: 587,
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PWD as string,
    },
};

const createTransporter = (config: MailConfig) => {
    return nodemailer.createTransport(config);
};

export const sendMail = async (mailOptions: MailOptions, purpose: string) => {
    let transporter = createTransporter(config);
    await transporter.verify();
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error Sending ${purpose} Email:`, error);
        } else {
            console.log(`${purpose} Email Sent:`, info.response);
        }
    });
};

export const sendWelcomeEmail = async (users: User[]) => {
    for (let user of users) {
        const token = jwt.sign(
            { id: user.user_id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h',
            }
        );
        ejs.renderFile(
            'templates/welcome.ejs',
            {
                username: user.username,
                link: `http://localhost:8008/confirm-email/${token}`,
                appURL: 'https://overflow.awesam.tech/home',
            },
            async (error, html) => {
                if (error) {
                    console.log(error.message);
                    return error;
                } else {
                    try {
                        const message = {
                            from: process.env.EMAIL as string,
                            to: user.email as string,
                            subject: 'Welcome to SlackOverflow',
                            html,
                        };
                        await sendMail(message, 'Welcome');
                        await DatabaseHelper.query(
                            `UPDATE Users SET email_sent ='1' WHERE user_id ='${user.user_id}'`
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        );
    }
};

export const sendPasswordResetEmail = async (users: User[]) => {
    for (let user of users) {
        const token = jwt.sign(
            { id: user.user_id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h',
            }
        );
        ejs.renderFile(
            'templates/reset.ejs',
            {
                name: user.username,
                resetLink: `http://localhost:8008/reset-password/${token}`,
            },
            async (error, html) => {
                if (error) {
                    return error;
                } else {
                    try {
                        const message = {
                            from: process.env.EMAIL as string,
                            to: user.email as string,
                            subject: 'You requested a password reset',
                            html,
                        };
                        await sendMail(message, 'Password Reset');
                        await DatabaseHelper.query(
                            `UPDATE Users SET passwordResetRequested=0 WHERE id ='${user.user_id}'`
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        );
    }
};

export const sendAnswerAcceptedEmail = async (answers: AcceptedAnswer[]) => {
    for (let answer of answers) {
        ejs.renderFile(
            'templates/answerAccepted.ejs',
            {
                username: answer.username,
                question_title: answer.question_title,
                asker: answer.question_username,
            },
            async (err, html) => {
                if (err) {
                    console.log(err);
                    return;
                }
                try {
                    let message = {
                        from: process.env.EMAIL as string,
                        to: answer.email as string,
                        subject: 'Congrats! ',
                        html,
                    };
                    await sendMail(message, 'Answer Accepted');
                    DatabaseHelper.query(
                        `UPDATE Answers SET email_sent=1 WHERE user_id='${answer.user_id}' and answer_id='${answer.answer_id}'`
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        );
    }
};
