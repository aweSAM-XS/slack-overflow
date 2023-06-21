import { Request } from 'express';

export interface User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    location?: string;
    website?: string;
    twitter?: string;
    github?: string;
    created_on: Date;
    is_approved: boolean;
    email_sent: boolean;
    is_deleted: boolean;
    passwordResetRequested: boolean;
}

export interface ExtendedRequest extends Request {
    body: {
        username: string;
        email: string;
        password: string;
        role?: string;
        location?: string;
        website?: string;
        twitter?: string;
        github?: string;
    };
    params: {
        user_id: string;
    };
}

export interface Question {
    tags: string[];
    user_id: string;
    is_answered: boolean;
    view_count: number;
    accepted_answer_id: string;
    answer_count: number;
    score: number;
    creation_date: number;
    last_edit_date: number;
    question_id: string;
    title: string;
    body: string;
}

export interface userPayload {
    user_id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface Answer {
    answer_id: string;
    user_id: string;
    question_id: string;
    answer_body: string;
    is_accepted: string;
    created_on: Date;
}

export interface Comment {
    comment_id: string;
    user_id: string;
    answer_id: string;
    comment_body: string;
}

export interface Vote {
    vote_id: string;
    user_id: string;
    answer_id: string;
    vote_type: string;
}

export interface Tag {
    tag_id: string;
    tag_name: string;
    tag_description: string;
}
