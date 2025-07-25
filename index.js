import dotenv from 'dotenv/config'
import express from 'express'
import connection from './src/config/db_connection.js'
import userRouter from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import logger from "./src/middlewares/loggerMiddleware.js";
import cookieParser from "cookie-parser"
import tokenValidation from "./src/middlewares/verifyTokenMiddleware.js"
import startupRoutes from "./src/routes/startupRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser())

app.get('/test-sqs', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
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
app.use(startupRoutes)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/test-sqs`);
});

