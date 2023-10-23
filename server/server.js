const express = require('express');
const registerUser = require('./Auth/userReg');
const loginUser = require('./Auth/userLogin');
const { connectToDB } = require('./models/dbConnect');
const blogController = require('./controllers/blogController');


const app = express();
const PORT = 3500;

app.use(express.json());

async function startServer() {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection('users');
    const blogCollection = db.collection('blogPosts');

    app.post('/register', async (req, res) => {
      try {
        const response = await registerUser(usersCollection, req.body);
        res.status(201).send(response);
      } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
      }
    });

    app.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        const response = await loginUser(usersCollection, email, password);
        res.send(response);
      } catch (error) {
        console.error(error.message);
        res.status(401).send(error.message);
      }
    });

    // Create a new blog post
    app.post('/blog/posts', async (req, res) => {
      try {
        const { title, content, author, tags } = req.body;
        const blogPost = await blogController.createBlogPost(blogCollection, title, content, author, tags);
        res.status(201).json(blogPost);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Get all blog posts optionally filtered
    app.get('/blog/posts', async (req, res) => {
      try {
        const { tags } = req.query;
        let filter = {};
        // If tags are provided in the query parameters, add tag filtering to the query
        if (tags) {
          filter.tags = { $in: tags.split(',') }; // Assuming tags are comma-separated strings
        }
        const blogPosts = await blogController.getAllBlogPosts(blogCollection, filter);
        res.json(blogPosts);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // get blog post by id
    app.post('/blog/posts/id', async (req, res) => {
      try {
        const { postId } = req.body;
        const blogPost = await blogController.getBlogPostById(blogCollection, postId);
        res.status(201).json(blogPost);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // update blog post by id
    app.put('/blog/posts/update', async (req, res) => {
      try {
        const { postId, updatedData } = req.body;
        const blogPost = await blogController.updateBlogPost(blogCollection, postId, updatedData);
        res.status(201).json(blogPost);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });

    // delete blog post by id
    app.delete('/blog/posts/delete', async (req, res) => {
      try {
        const { postId } = req.body;
        const blogPost = await blogController.deleteBlogPost(blogCollection, postId);
        res.status(201).json(blogPost);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });


    app.get('/', (req, res) => {
      res.send('Server is now running!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
