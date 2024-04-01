import express from 'express';
import { createPost, getPost, updatePost, deletePost } from '../controllers/PostController.js';

const router = express.Router();

// Route for creating a new post
router.post('/', createPost);

// Route for getting a single post by ID
router.get('/:id', getPost);

// Route for updating a post by ID
router.put('/:id', updatePost);

// Route for deleting a post by ID
router.delete('/:id', deletePost);

export default router;
