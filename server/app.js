import express, { json } from 'express';
import { connect } from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import authenticateToken from './middleware/authenticateToken.js';
import cors from 'cors';


const app = express();

connect('mongodb+srv://nictekieli:Mudd2024!@clusteriso.s2vnr6k.mongodb.net/?retryWrites=true&w=majority&appName=clusterISO', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(cors());
app.use('/users/profile', authenticateToken, userRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

