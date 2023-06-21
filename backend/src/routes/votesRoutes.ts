import { Router } from 'express';
import { authenticateUser } from '../middleware/authUser';
import { castVote, getAnswerVotes, getUserVotes } from '../controllers/voteControllers';


export const votesRoutes = Router();

votesRoutes.post('/:answer_id', authenticateUser, castVote)
votesRoutes.get('/user', authenticateUser, getUserVotes)
votesRoutes.get('/:answer_id', authenticateUser, getAnswerVotes)

