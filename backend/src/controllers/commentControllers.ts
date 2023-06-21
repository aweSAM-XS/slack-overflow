import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Comment } from '../interfaces';
import { DatabaseHelper } from '../databaseHelper';


// Add comment
export const addComment = async (req: Request, res: Response) => {
    try {
        let comment_id = uuid();
        const { comment_body, user } = req.body;
        const { user_id } = user;
        const { answer_id } = req.params;
        await DatabaseHelper.exec('CreateComment', {
            comment_id,
            user_id,
            answer_id,
            comment_body,
        });
        return res
            .status(201)
            .json({ message: 'Comment submitted successfully' });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get comments by answer
export const getCommentsByAnswer = async (req: Request, res: Response) => {
    try {
        const { answer_id } = req.params;
        let comments: Comment[] = (
            await DatabaseHelper.exec('getCommentsByAnswer', { answer_id })
        ).recordset;
        return res.status(200).json(comments);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Comments By User
export const getCommentsByUser = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        let comments: Comment[] = (
            await DatabaseHelper.exec('GetCommentsByUser', { user_id })
        ).recordset;
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error?.toString() });
    }
};

// Delete comment
export const deleteComment = async (req: Request, res: Response) => {
	try {
		const { comment_id } = req.params
		await DatabaseHelper.exec('DeleteComment', { comment_id })
        return res.status(200).json({ message: 'Comment has been deleted' });

	} catch (error) {
        return res.status(500).json({ message: error?.toString() });
	}
}