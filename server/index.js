import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/users.js';
import questionsRoutes from './routes/Questions.js';
import answersRoutes from './routes/Answers.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config()
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


const PORT = process.env.PORT || 5000;

app.use('/user', userRoutes);
app.use('/questions',questionsRoutes);
app.use('/answer',answersRoutes);

app.get('/', (req, res) => {
    res.send("Stack Overflow Clone");
});

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
