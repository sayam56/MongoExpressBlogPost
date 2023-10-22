const express = require('express');
const registerUser = require('./Auth/userReg');
const loginUser = require('./Auth/userLogin');
const { connectToDB } = require('./dbConnect');

const app = express();
const PORT = 3500;

app.use(express.json());

async function startServer() {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection('users');

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
