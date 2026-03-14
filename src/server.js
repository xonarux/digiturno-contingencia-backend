import express from 'express';
import turnoRoutes from './routes/turnoRoutes.js';
import { createConnection } from 'mysql2/promise';
import salaRoutes from './routes/salaRoutes.js';
import cajaRoutes from './routes/cajaRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
app.use('/api', turnoRoutes);
app.use('/api', salaRoutes);
app.use('/api', cajaRoutes);
app.use('/api', webhookRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {

    console.log(`Servidor corriendo en el puerto ${PORT}`);
    try {
        const connection = await createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        await connection.connect();
        console.log('Conexión a la base de datos establecida.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
});
