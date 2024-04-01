import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Route for registering a new user
router.post('/register', registerUser);

// Route for logging in a user
router.post('/login', loginUser);

// Route for getting the user profile
router.get('/profile', getUserProfile);

export default router;
