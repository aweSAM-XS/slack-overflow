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

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html: string;
}

export interface MailConfig {
    host: string;
    service: string;
    port: number;
    auth: {
        [k: string]: string;
    };
}

export interface AcceptedAnswer {
    user_id: string;
    username: string;
    email: string;
    answer_id: string;
    question_title: string;
    question_username: string;
}
