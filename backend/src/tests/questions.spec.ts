import { it, expect, describe } from 'vitest';
import request from 'supertest';
import { app } from '../server';

describe('Question Tests', () => {
    it.skip('Add question', async () => {
        const response = await request(app)
            .post('/questions/ask')
            .set('Authorization', 'Bearer <token>')
            .send({
                question_title: 'Test question',
                question_body: 'This is a test question',
                tags: ['tag1', 'tag2'],
                user: { user_id: 'user123' },
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Question submitted successfully');
    });

    it.skip('Get all questions', async () => {
        const response = await request(app)
            .get('/questions')
            .set('Authorization', 'Bearer <token>');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it.skip('Get user questions', async () => {
        const response = await request(app)
            .get('/questions/user/user123')
            .set('Authorization', 'Bearer <token>');

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it.skip('Get question by ID', async () => {
        const response = await request(app)
            .get('/questions/question_id')
            .set('Authorization', 'Bearer <token>');

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it.skip('Update question', async () => {
        const response = await request(app)
            .put('/questions/question_id')
            .set('Authorization', 'Bearer <token>')
            .send({
                question_title: 'Updated question',
                question_body: 'This is an updated test question',
                tags: ['tag1', 'tag2'],
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Question updated successfully');
    });

    it.skip('Delete question', async () => {
        const response = await request(app)
            .delete('/questions/delete/question_id')
            .set('Authorization', 'Bearer <token>');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Deleted successfully');
    });

    it.skip('Attempt to delete question without authorization', async () => {
        const response = await request(app).delete(
            '/questions/delete/question_id'
        );

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it.skip('Attempt to update question without authorization', async () => {
        const response = await request(app)
            .put('/questions/question_id')
            .send({
                question_title: 'Updated question',
                question_body: 'This is an updated test question',
                tags: ['tag1', 'tag2'],
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it.skip('Get question by ID not found', async () => {
        const response = await request(app)
            .get('/questions/nonexistent_question_id')
            .set('Authorization', 'Bearer <token>');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Question Not Found');
    });

    it.skip('Get all questions with error', async () => {
        const response = await request(app)
            .get('/questions')
            .set('Authorization', 'Bearer <token>');

        expect(response.status).toBe(500);
        expect(response.body.message).toBeDefined();
    });
});
