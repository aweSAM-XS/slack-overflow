import { Router } from 'express';
import {
    getUsers,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    changePassword,
    registerUser,
} from '../controllers/userControllers';
import { authenticateAdmin } from '../middleware/authAdmin';
import { authenticateUser } from '../middleware/authUser';

export const UserRoutes = Router();

UserRoutes.post('', registerUser);
UserRoutes.post('/login', loginUser);
UserRoutes.get('', authenticateUser, getUsers);
UserRoutes.get('/user', authenticateUser, getUserById);
UserRoutes.get('/mail', authenticateUser, getUserByEmail);
UserRoutes.put('/:user_id', authenticateUser, updateUser);
UserRoutes.post('/:user_id', changePassword);
UserRoutes.delete('/:user_id', authenticateAdmin, deleteUser);
