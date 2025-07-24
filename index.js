import dotenv from 'dotenv/config'
import express from 'express'
import connection from './src/config/db_connection.js'
import userRouter from "./src/routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/test-sqs', (req, res) => {
    connection.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            res.status(500).send('Error querying the database');
            return;
        }
        res.json(results);
    });
});


app.use('/users',userRouter)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}/test-sqs`);
});

