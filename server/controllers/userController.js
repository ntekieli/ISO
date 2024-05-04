import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        const user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
        res.status(201).json({ user: { username, email }, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Use environment variable for JWT secret
        res.json({ token, user: { email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ error: error.message }); // Use 500 for server errors
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password field
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ username: user.username, email: user.email }); // Return non-sensitive data
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { registerUser, loginUser, getUserProfile };