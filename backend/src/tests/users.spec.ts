import { it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../server';

describe('User Tests', () => {
    it.skip('Register a new user', async () => {
        const response = await request(app).post('/users').send({
            username: 'johnny.sins',
            email: 'sin@example.com',
            password: 'Password123!',
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User registered successfully.');
    });

    it.skip('Register a duplicate user', async () => {
        const response = await request(app).post('/users').send({
            username: 'john.doe',
            email: 'tested@example.com',
            password: 'Password123!',
        });

        expect(response.status).toBe(500);
        expect(() => {
            throw new Error('An error occurred while registering user.');
        }).toThrowError(/An error occurred while registering user./);
    });

    it('Validate password', async () => {
        const response = await request(app).post('/users').send({
            username: 'joh.doe',
            email: 'testy@example.com',
            password: 'awesamity',
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
            '"password" with value "awesamity" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/'
        );
    });

    it('Log in with valid credentials before confirming email', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'test@example.com',
            password: 'awesamity',
        });

        expect(response.body.message).toBe('Kindly confirm your email first');
        expect(response.status).toBe(401);
    });

    it('Log in with valid credentials', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'olivia@example.com',
            password: 'awesamity',
        });

        expect(response.body.message).toBe('Log in successfull');
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('Log in with valid credentials for deleted user', async () => {
        const response = await request(app).post('/users/login').send({
            email: 'natoner999@aaorsi.com',
            password: 'awesamity',
        });

        expect(response.body.message).toBe('User not found');
        expect(response.status).toBe(404);
    });

    it('Get all users (authenticated)', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'olivia@example.com',
            password: 'awesamity',
        });

        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('Get user by ID (authenticated)', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'olivia@example.com',
            password: 'awesamity',
        });

        const response = await request(app)
            .get('/users//user?user_id=12965bed-b09e-4dd1-8555-17a6e124c1cc')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('Get non-existant user by ID (authenticated)', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'olivia@example.com',
            password: 'awesamity',
        });

        const response = await request(app)
            .get('/users/user?user_id=6fc5ac4f')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User Not Found');
    });

    it('Get user by email (authenticated)', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'olivia@example.com',
            password: 'awesamity',
        });

        const response = await request(app)
            .get('/users/mail')
            .query({ email: 'olivia@example.com' })
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('Update user details (authenticated)', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'peter@example.com',
            password: 'awesamity',
        });

        const response = await request(app)
            .put('/users/user?user_id=c4a7e104-8fb7-4e7b-8f6c-153c0b3ab56c')
            .send({
                username: 'don_joe',
                email: 'peterson@example.com',
                password: 'awesamity',
                role: 'user',
                location: 'Nanyuki',
                website: 'https://awesam.netlify.app',
                twitter: 'pete',
                github: 'pete',
            })
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.body.message).toBe('Details updated sucessfully');
        expect(response.status).toBe(200);
    });

    it('Change password (authenticated)', async () => {
        const response = await request(app).post('/users/user_id').send({
            email: 'olivia@example.com',
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Password reset link sent to email');
    });

    it.skip('Delete user (admin)', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'admin@example.com',
            password: 'adminpassword',
        });

        const response = await request(app)
            .delete('/users/user_id')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User deleted successfuly');
    });

    it.skip('Attempt to delete user without admin privileges', async () => {
        const loginResponse = await request(app).post('/users/login').send({
            email: 'olivia@example.com',
            password: 'awesamity',
        });

        const response = await request(app)
            .delete('/users/user_id')
            .set('Authorization', `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });

    it.skip('Attempt to access protected route without authentication', async () => {
        const response = await request(app).get('/users');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
});
