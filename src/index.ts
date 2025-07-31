import dotenv from 'dotenv/config'
import express, {Request, Response} from 'express';
import connection from "./config/db_connection.ts";
import userRouter from "./routes/userRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";
import logger from "./middlewares/loggerMiddleware.ts";
import cookieParser from "cookie-parser";
import startupRoutes from "./routes/startupRoutes.ts";
import multer from "multer"
import perksRoutes from "./routes/perksRoutes.ts";
import {RowDataPacket} from "mysql2";
import {runStartupTasks} from "./scripts/startupTasks.ts";


const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser())
const upload = multer({dest: 'uploads/'});

app.get('/test-sqs', (req: Request, res: Response) => {
    connection.query<RowDataPacket[]>('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database');
            return;
        }
        res.json(results);
    });
});

app.use(logger)
app.use(userRouter)
app.use(authRoutes)
app.use(perksRoutes)
app.use(startupRoutes)


app.listen(port, async () => {
    console.log(`Server listening at http://localhost:${port}/test-sqs`);
    try {
        await runStartupTasks()
    } catch (e: unknown) {
        if (e instanceof Error)
            console.log(e.message)
    }
});

