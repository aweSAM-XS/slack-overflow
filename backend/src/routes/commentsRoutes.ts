import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getCommentsByAnswer,
	getCommentsByUser,
} from '../controllers/commentControllers';
import { authenticateUser } from '../middleware/authUser';
import { authenticateAdmin } from '../middleware/authAdmin';

export const commentsRoutes = Router();

commentsRoutes.post('/:answer_id', authenticateUser, addComment);
commentsRoutes.get('/:answer_id', authenticateUser, getCommentsByAnswer);
commentsRoutes.get('/user/:user_id', authenticateUser, getCommentsByUser);
commentsRoutes.delete('/:comment_id', authenticateAdmin, deleteComment);


