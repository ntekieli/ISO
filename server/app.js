const express = require('express');
const path = require('path');
const { json, response } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://nictekieli:Mudd2024!@clusteriso.s2vnr6k.mongodb.net/?retryWrites=true&w=majority&appName=clusterISO";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
app.use(json());

const cors = require('cors');
app.use(cors());


const PORT = process.env.PORT || 3001;


// Connect to MongoDB and start the server
client.connect(error => {
    if (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
    console.log('Connected to MongoDB');

    const db = client.db('post_data');
    const collection = db.collection('current_posts');

    // Create a new post
    app.post('/posts', async (req, res) => {
        try {
            const newItem = req.body;
            const result = await collection.insertOne(newItem);
            res.status(201).json(result.ops[0]);
        } catch {
            console.error('Error adding new post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    // Get all posts
    app.get('/posts', async (req, res) => {
        try {
            const posts = await collection.find({}).toArray();
            res.send(posts);
            console.log('send posts!')
        } catch (error) {
            console.error('Error getting posts:', error);
            res.status(500).send({ error: 'Internal server error' });
        }
    });

    // Get a single post by ID
    app.get('/posts/:id', async (req, res) => {
        try {
            const post = await collection.findOne({ _id: new ObjectId(req.params.id) });
            if (post) {
                res.send(post);
            } else {
                res.status(404).send({ error: 'Post not found' });
            }
        } catch (error) {
            console.error('Error getting a post:', error);
            res.status(500).send({ error: 'Internal server error' });
        }
    });

    // Update a post by ID
    app.put('/posts/:id', async (req, res) => {
        try {
            const result = await collection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: req.body }
            );
            if (result.matchedCount === 0) {
                res.status(404).send({ error: 'Post not found' });
            } else {
                res.send({ message: 'Post updated successfully' });
            }
        } catch (error) {
            console.error('Error updating a post:', error);
            res.status(500).send({ error: 'Internal server error' });
        }
    });

    // Delete a post by ID
    app.delete('/posts/:id', async (req, res) => {
        try {
            const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
            if (result.deletedCount === 0) {
                res.status(404).send({ error: 'Post not found' });
            } else {
                res.send({ message: 'Post deleted successfully' });

            }
        } catch (error) {
            console.error('Error deleting a post:', error);
            res.status(500).send({ error: 'Internal server error' });
        }
    });

    // Serve static files from the React app build directory
    app.use(express.static(path.join(__dirname, '../client/build')));

    // The catch-all route to serve the React app's index.html for any other requests
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log('Server Listening on PORT:', PORT)
    })

});
