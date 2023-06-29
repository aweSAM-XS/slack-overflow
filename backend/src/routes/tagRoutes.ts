import { Router } from 'express';
import {
    getTagById,
    getTagByName,
    addTag,
    deleteTag,
    getAllTags,
} from '../controllers/tagControllers';
import { authenticateUser } from '../middleware/authUser';
import { authenticateAdmin } from '../middleware/authAdmin';

export const tagRoutes = Router();

tagRoutes.post('', authenticateAdmin, addTag);
tagRoutes.get('', authenticateUser, getAllTags);
tagRoutes.get('/tag/:tag_id', authenticateUser, getTagById);
tagRoutes.get('/:tag_name', authenticateUser, getTagByName);
tagRoutes.delete('/:comment_id', authenticateAdmin, deleteTag);
