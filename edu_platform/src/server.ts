import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth';
import coursesRoutes from './routes/courses';
import moduleRoutes from './routes/modules';
import coursesDetails from './routes/coursesDetails';
import lessonRoutes from './routes/lesson';
import testRoutes from './routes/tests';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api', coursesDetails);
app.use('/api', lessonRoutes);
app.use('/api', testRoutes);

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        env: process.env.NODE_ENV || "dev"
    });
});

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
    console.log(`сервер запущен на http://localhost:${PORT}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Ошибка: Порт ${PORT} уже используется`);
    } else {
        console.error(`Ошибка ${err}`);
    }

    process.exit(1);
});