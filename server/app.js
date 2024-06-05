import express, { json } from 'express';
import { connect } from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

connect('mongodb+srv://nictekieli:Mudd2024!@clusteriso.s2vnr6k.mongodb.net/?retryWrites=true&w=majority&appName=clusterISO', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/users', userRoutes);  // Attach all user routes
app.use('/posts', postRoutes);  // Attach all post routes



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

