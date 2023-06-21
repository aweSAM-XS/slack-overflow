import { Request, RequestHandler, Response } from 'express';
import { v4 as uid } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DatabaseHelper } from '../databaseHelper';
import { User, ExtendedRequest } from '../interfaces';
import { userRegistration } from '../validations/userValidations';

//Add new User
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const { error } = userRegistration.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        const user_id = uid();
        const hashedPassword = await bcrypt.hash(password, 10);

        await DatabaseHelper.exec('CreateUser', {
            user_id,
            username,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { user_id, email },
            process.env.JWT_SECRET as string,
            { expiresIn: '36h' }
        );
        res.status(200).json({
            message: 'User registered successfully.',
            token,
            payload: { user_id, username, email, role: 'user' },
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            error: 'An error occurred while registering user.',
        });
    }
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        let user: User[] = (
            await DatabaseHelper.exec('getUserByEmail', { email })
        ).recordset;

        if (!user[0] || user[0].is_deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user[0].is_approved) {
            return res
                .status(401)
                .json({ message: 'Kindly confirm your email first' });
        }

        let validUser = await bcrypt.compare(password, user[0].password);

        if (!validUser) {
            return res
                .status(404)
                .json({ message: 'Wrong username or password' });
        }

        const payload = user.map((u) => {
            const {
                password,
                username,
                is_deleted,
                is_approved,
                email_sent,
                passwordResetRequested,
                location,
                website,
                twitter,
                github,
                created_on,
                ...rest
            } = u;
            return rest;
        });

        const token = jwt.sign(payload[0], process.env.JWT_SECRET as string, {
            expiresIn: '36h',
        });

        return res.json({ message: 'Log in successfull', token, payload });
    } catch (error: any) {
        return res.status(404).json(error.message);
    }
};

//Get all users
export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = (await DatabaseHelper.exec('GetAllUsers')).recordset;
        if (users.length > 0) {
            return res.status(200).json(users);
        }
        return res.status(404).json({ message: 'No users registered' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

//Get User By Email
export const getUserByEmail: RequestHandler = async (req, res) => {
    try {
        const { email } = req.query as { email: string };
        const user = (await DatabaseHelper.exec('GetUserByEmail', { email }))
            .recordset;
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User Not Found' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Get user by ID
export const getUserById: RequestHandler = async (req, res) => {
    try {
        const { user_id } = req.query as { user_id: string };

        const user = (await DatabaseHelper.exec('GetUserByID', { user_id }))
            .recordset;
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json({ message: 'User Not Found' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

//Update User
export const updateUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const {
            username,
            email,
            password,
            role,
            location,
            website,
            twitter,
            github,
        } = req.body;
        let hashedPassword = await bcrypt.hash(password, 10);
        const { user_id } = req.params;
        const user = (await DatabaseHelper.exec('GetUserByID', { user_id }))
            .recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        await DatabaseHelper.exec('UpdateUser', {
            user_id,
            username,
            email,
            password: hashedPassword,
            role,
            location,
            website,
            twitter,
            github,
        });
        return res.status(200).json({ message: 'Details updated sucessfully' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};

// Change Password
export const changePassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    await DatabaseHelper.query(
        `Update Users SET passwordResetRequested=1 WHERE email='${email}'`
    );
    return res
        .status(200)
        .json({ message: 'Password reset link sent to email' });
};

// Delete user
export const deleteUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const { user_id } = req.params;
        const user = (await DatabaseHelper.exec('GetUserByID', { user_id }))
            .recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        await DatabaseHelper.exec('DeleteUser', { user_id });
        res.status(200).json({ message: 'User deleted successfuly' });
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
};
