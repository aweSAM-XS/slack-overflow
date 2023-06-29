import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import { Answer, Question } from '../interfaces';


// Create Answer
export const addAnswer = async (req: Request, res: Response) => {
    try {
        let answer_id = uuid();
        const { answer_body, user } = req.body;
        const { user_id } = user;
        const { question_id } = req.params;
        let question: Question = (
            await DatabaseHelper.exec('GetQuestionById', { question_id })
        ).recordset[0];
        console.log(user);
        if (question) {
            await DatabaseHelper.exec('CreateAnswer', {
                answer_id,
                user_id,
                question_id,
                answer_body,
            });
            return res
                .status(201)
                .json({ message: 'Answer submitted successfully' });
        } else {
            return res.status(404).json({ message: 'Question Not Found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get answers by question
export const getAnswersByQuestion = async (req: Request, res: Response) => {
    try {
        const { question_id } = req.params;
        let answers: Answer[] = (
            await DatabaseHelper.exec('GetAnswersByQuestion', {
                question_id,
            })
        ).recordset;
        return res.status(200).json(answers);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get answers by user
export const getAnswersByUser = async (req: Request, res: Response) => {
    try {
		const { user_id } = req.body.user;
        let answers: Answer[] = (
            await DatabaseHelper.exec('GetAnswersByUser', {
                user_id,
            })
        ).recordset;
        return res.status(200).json(answers);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Accept an answer
export const acceptAnswer = async (req: Request, res: Response) => {
    const { user_id } = req.body.user;
    const { answer_id } = req.params;
    const { question_id } = req.body;

    const question: Question = (
        await DatabaseHelper.exec('GetQuestionById', { question_id })
    ).recordset[0];

    if (question.user_id !== user_id) {
        return res.status(401).json({ message: 'Unauthorised' });
    }

    try {
        await DatabaseHelper.exec('RemoveAcceptedAnswer', { question_id });
        await DatabaseHelper.exec('AcceptAnswer', { answer_id });
        return res.status(200).json({ message: 'Answer has been accepted' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete answer
export const deleteAnswer = async (req: Request, res: Response) => {
    try {
        const { answer_id } = req.params;
        await DatabaseHelper.exec('DeleteAnswer', { answer_id });
        return res.status(200).json({ message: 'Answer has been deleted' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
