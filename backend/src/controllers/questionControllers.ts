import { Request,  Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Question } from '../interfaces';
import { DatabaseHelper } from '../databaseHelper';


// Add question

export const addQuestion = async (req: Request, res: Response) => {
    try {
        let question_id = uuid();
        const { question_title, question_body, tags, user } = req.body;
        const { user_id } = user;
        await DatabaseHelper.exec('CreateQuestion', {
            question_id,
            user_id,
            question_title,
            question_body,
        });
        tags.forEach(async (tag: string) => {
            await DatabaseHelper.exec('AddQuestionTags', {
                tag_id: tag,
                question_id,
            });
        });
        return res
            .status(200)
            .json({ message: 'Question submited successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllQuestions = async (req: Request, res: Response) => {
    try {
        let questions: Question[] = (
            await DatabaseHelper.exec('GetAllQuestions')
        ).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUserQuestions = async (
    req: Request<{ user_id: string }>,
    res: Response
) => {
    try {
        const { user_id } = req.params;
        let questions: Question[] = (
            await DatabaseHelper.exec('GetQuestionsByUser', { user_id })
        ).recordset;
        return res.status(200).json(questions);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getQuestionById = async (
    req: Request,
    res: Response
) => {
    try {
        const { question_id } = req.params;
        let question: Question = (
            await DatabaseHelper.exec('GetQuestionById', { question_id })
        ).recordset[0];
        if (question) {
            return res.status(200).json(question);
        } else {
            return res.status(404).json({ message: 'Question Not Found' });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateQuestion = async (req: Request, res: Response) => {
    try {
        const { question_title, question_body, tags } = req.body;
        const { question_id } = req.params;
        await DatabaseHelper.exec('updateQuestion', {
            question_id,
            question_title,
            question_body,
        });
        tags.forEach(async (tag_id: string) => {
            await DatabaseHelper.exec('UpdateQuestionTags', {
                question_id,
                tag_id,
            });
        });
        return res
            .status(201)
            .json({ message: 'Question Updated successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const { question_id } = req.params;
        const { user_id, role } = req.body.user;
        let question: Question = (
            await DatabaseHelper.exec('GetQuestionById', { question_id })
        ).recordset[0];
        if (!question) {
            return res.status(404).json({ message: 'Question Not Found' });
        } else {
            if (question.user_id === user_id || role === 'admin') {
                await DatabaseHelper.exec('deleteQuestion', { question_id });
                return res
                    .status(200)
                    .json({ message: 'Deleted successfully' });
            } else {
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};
