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
    question_id: string;
    user_id: string;
    question_title: string;
    question_body: string;
    creation_date: string;
    edit_date: string | null;
    is_deleted: boolean;
    answer_count: number;
    question_tags: Array<{ tag_id: string, tag_name: string }>;
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
    username: string;
    answer_body: string;
    create_date: string;
    vote_count: number;
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
