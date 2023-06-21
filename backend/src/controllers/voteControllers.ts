import { Request, RequestHandler, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../databaseHelper';
import { Vote } from '../interfaces';

// Cast new vote
export const castVote: RequestHandler = async (req, res) => {
    const { answer_id } = req.params;
    const { vote_type, user } = req.body;
    const { user_id } = user;

    try {
        const existingVote: Vote = (
            await DatabaseHelper.exec('GetVoteByUserAndAnswer', {
                user_id,
                answer_id,
            })
        ).recordset[0];

        if (existingVote) {
            await DatabaseHelper.exec('UpdateVote', {
                vote_id: existingVote.vote_id,
                vote_type,
            });
        } else {
            const vote_id = uid();
            await DatabaseHelper.exec('CreateVote', {
                vote_id,
                user_id,
                answer_id,
                vote_type,
            });
        }

        return res.status(201).json({ message: 'Vote cast successfully' });
    } catch (error) {
        console.log(error?.toString());
    }
};

// Get votes by Answer
export const getAnswerVotes: RequestHandler = async (req, res) => {
    const { answer_id } = req.params;

    try {
        const answerVotes: Vote[] = (
            await DatabaseHelper.exec('GetVotesByAnswer', {
                answer_id,
            })
        ).recordset;
        return res.status(200).json({ answerVotes });
    } catch (error) {
        console.log(error?.toString());
    }
};

// Get votes by User
export const getUserVotes: RequestHandler = async (req, res) => {
    const { user_id } = req.body.user;
    try {
        const userVotes: Vote[] = (
            await DatabaseHelper.exec('GetVotesByUser', {
                user_id,
            })
        ).recordset;
        return res.status(200).json({ userVotes });
    } catch (error) {
        console.log(error?.toString());
    }
};
