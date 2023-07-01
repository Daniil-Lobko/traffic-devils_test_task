import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRouter';
import bookRouter from './src/routes/bookRouter';
import authenticateToken from './src/middleware/authenticateToken';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './docs/swagger.json'; // Замените путь на путь к вашему файлу спецификации OpenAPI

dotenv.config(); // Загрузка переменных окружения из файла .env
// config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Опции для cors
const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors(corsOptions));
app.use(express.json());

// Используйте маршрутизатор аутентификации
app.use('/auth', authRouter);
app.use('/books', authenticateToken, bookRouter); // Маршруты для книг

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});