import express, { Router } from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/userRoutes';
import { questionsRoutes } from './routes/questionRoutes';
import { answersRoutes } from './routes/answerRoutes';
import { commentsRoutes } from './routes/commentsRoutes';
import { votesRoutes } from './routes/votesRoutes';
import { tagRoutes } from './routes/tagRoutes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', UserRoutes);
app.use('/questions', questionsRoutes);
app.use('/answers', answersRoutes);
app.use('/tags', tagRoutes);
app.use('/comments', commentsRoutes);
app.use('/votes', votesRoutes);
app.use(function (req, res, next) {
    res.status(404).json({ error: 'Endpoint Not Found' });
});

const port = 6900;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});
