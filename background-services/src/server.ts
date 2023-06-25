import cron from 'node-cron';
import {
    sendAnswerAcceptedEmail,
    sendPasswordResetEmail,
    sendWelcomeEmail,
} from './SendEmail';
import { DatabaseHelper } from './DatabaseHelper';
import { AcceptedAnswer, User } from './interfaces';

cron.schedule('*/15 * * * * *', async () => {
    console.log('Watching DB 👀');

    // send welcome email
    const newUsers: User[] = (
        await DatabaseHelper.query(`SELECT * FROM Users WHERE email_sent=0
  `)
    ).recordset;
    sendWelcomeEmail(newUsers);

    // send password reset email
    const resetPasswordRequests: User[] = (
        await DatabaseHelper.query(`SELECT * FROM Users WHERE passwordResetRequested=1
  `)
    ).recordset;
    sendPasswordResetEmail(resetPasswordRequests);

    // send password reset email
    const acceptedAnswers: AcceptedAnswer[] = (
        await DatabaseHelper.exec(`GetAcceptedAnswers`)
    ).recordset;
    sendAnswerAcceptedEmail(acceptedAnswers);
});
