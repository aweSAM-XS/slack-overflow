import { Router } from 'express';
import {
    addQuestion,
    deleteQuestion,
    getAllQuestions,
    getUserQuestions,
    getQuestionById,
    updateQuestion,
    getQuestionsByTagName
} from '../controllers/questionControllers';
import { authenticateUser } from './../middleware/authUser';

export const questionsRoutes = Router();

questionsRoutes.post('/ask', authenticateUser, addQuestion);
questionsRoutes.get('', authenticateUser, getAllQuestions);
questionsRoutes.get('/user/:user_id', authenticateUser, getUserQuestions);
questionsRoutes.get('/:question_id', authenticateUser, getQuestionById);
questionsRoutes.get('/tag/:tag_name', authenticateUser, getQuestionsByTagName);
questionsRoutes.put('/:question_id', authenticateUser, updateQuestion);
questionsRoutes.delete('/delete/:question_id', authenticateUser, deleteQuestion);
