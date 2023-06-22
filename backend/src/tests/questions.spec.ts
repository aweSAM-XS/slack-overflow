import { it, expect, describe } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('Question Tests', () => {
    it('Add question', async () => {
        const response = await request(app)
            .post('/questions/ask')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            )
            .send({
                question_title: 'Test question',
                question_body: 'This is a test question',
                tags: [
                    '12965bed-b09e-4dd1-8555-17a6e124c1cc',
                    '12965bed-b09e-4dd1-8555-17a6e124c1cc',
                ],
                user: { user_id: 'user123' },
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Question submited successfully');
    });

    it('Get all questions', async () => {
        const response = await request(app)
            .get('/questions')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            );

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Get user questions', async () => {
        const response = await request(app)
            .get('/questions/user/12965deb-b09e-4dd1-8555-17a6e124c1cc')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            );

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Get question by ID', async () => {
        const response = await request(app)
            .get('/questions/6fc5ac4f-cd3d-4f03-950e-722e2d0e2e1d')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            );

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('Update question', async () => {
        const response = await request(app)
            .put('/questions/6fc5ac4f-cd3d-4f03-950e-722e2d0e2e1d')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            )
            .send({
                question_title: 'Updated question',
                question_body: 'This is an updated test question',
                tags: [
                    '12965bed-b09e-4dd1-8555-17a6e124c1cc',
                    '4a1c6cd1-2250-4fc6-8030-41fe75c165d6',
                ],
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Question Updated successfully');
    });

    it.skip('Delete question', async () => {
        const response = await request(app)
            .delete('/questions/delete/6fc5ac4f-cd3d-4f03-950e-722e2d0e2e1d')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            );

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Deleted successfully');
    });

    it('Attempt to delete question without authorization', async () => {
        const response = await request(app).delete(
            '/questions/delete/6fc5ac4f-cd3d-4f03-950e-722e2d0e2e1d'
        );

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('Attempt to update question without authorization', async () => {
        const response = await request(app)
            .put('/questions/6fc5ac4f-cd3d-4f03-950e-722e2d0e2e1d')
            .send({
                question_title: 'Updated question',
                question_body: 'This is an updated test question',
                tags: [
                    '4a1c6cd1-2250-4fc6-8030-41fe75c165d6',
                    '12965bed-b09e-4dd1-8555-17a6e124c1cc',
                ],
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it('Get question by ID not found', async () => {
        const response = await request(app)
            .get('/questions/nonexistent_6fc5ac4f-cd3d-4f03-950e-722e2d0e2e1d')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTI5NjVkZWItYjA5ZS00ZGQxLTg1NTUtMTdhNmUxMjRjMWNjIiwiZW1haWwiOiJuYXRvbmVyOTk5QGFhb3JzaS5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzMzMTUxOSwiZXhwIjoxNjg3NDYxMTE5fQ.iCKmrnivw1qWQ_Oe2eWhjuLVGnbLgv9hXSFfjDqQZqg'
            );

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Question Not Found');
    });
});
