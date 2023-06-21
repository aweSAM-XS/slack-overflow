import { Router } from 'express';

import { authenticateUser } from '../middleware/authUser';
import {
    acceptAnswer,
    addAnswer,
    deleteAnswer,
    getAnswersByQuestion,
    getAnswersByUser,
} from '../controllers/answerControllers';

export const answersRoutes = Router();

answersRoutes.post('/:question_id', authenticateUser, addAnswer);
answersRoutes.get('/user', authenticateUser, getAnswersByUser);
answersRoutes.get('/:question_id', authenticateUser, getAnswersByQuestion);
answersRoutes.post('/accept/:answer_id', authenticateUser, acceptAnswer);
answersRoutes.delete('/delete/:answer_id', authenticateUser, deleteAnswer);
