import cors from 'cors';
import express from 'express';
import { UserRoutes } from './routes/userRoutes';
import { questionsRoutes } from './routes/questionRoutes';
import {answersRoutes} from './routes/answerRoutes';
import {commentsRoutes} from './routes/commentsRoutes';
import { votesRoutes } from './routes/votesRoutes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', UserRoutes);
app.use('/questions', questionsRoutes);
app.use('/answers', answersRoutes);
app.use('/comments', commentsRoutes);
app.use('/votes', votesRoutes);

const port = 6900;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
