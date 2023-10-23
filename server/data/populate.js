const { MongoClient, ObjectId } = require('mongodb');

async function populateDatabase() {
  const client = new MongoClient('mongodb://localhost:27023');

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('aliBlogPlatformDB');

    // Sample users data
    const users = [
      { username: 'user1', email: 'user1@example.com', password: 'password1', registrationDate: new Date() },
      { username: 'user2', email: 'user2@example.com', password: 'password2', registrationDate: new Date() },
      { username: 'user3', email: 'user3@example.com', password: 'password3', registrationDate: new Date() },
      { username: 'user4', email: 'user4@example.com', password: 'password4', registrationDate: new Date() },
    ];

    // Sample blog posts data
    const blogPosts = [
      { title: 'Post 1', content: 'Content of Post 1', author: new ObjectId('65358d5657b7be93b0eb8a8e'), creationDate: new Date(), tags: ['tag1', 'tag2'] },
      { title: 'Post 2', content: 'Content of Post 2', author: new ObjectId('65358d5657b7be93b0eb8a8e'), creationDate: new Date(), tags: ['tag3', 'tag4'] },
      { title: 'Post 3', content: 'Content of Post 3', author: new ObjectId('65358d5657b7be93b0eb8a8e'), creationDate: new Date(), tags: ['tag4', 'tag5'] },
      { title: 'Post 4', content: 'Content of Post 4', author: new ObjectId('65358d5657b7be93b0eb8a8e'), creationDate: new Date(), tags: ['tag5', 'tag6'] },

    ];

    // Sample comments data
    const comments = [
      { commenterName: 'Commenter 1', commentText: 'Comment 1 on Post 1', creationDate: new Date(), blogPost: new ObjectId('65358fbc57b7be93b0eb8a99') },
      { commenterName: 'Commenter 2', commentText: 'Comment 2 on Post 1', creationDate: new Date(), blogPost: new ObjectId('65358fbc57b7be93b0eb8a99') },
      { commenterName: 'Commenter 3', commentText: 'Comment 1 on Post 2', creationDate: new Date(), blogPost: new ObjectId('65358fbc57b7be93b0eb8a99') },
      { commenterName: 'Commenter 4', commentText: 'Comment 1 on Post 3', creationDate: new Date(), blogPost: new ObjectId('65358fbc57b7be93b0eb8a99') },
      { commenterName: 'Commenter 5', commentText: 'Comment 1 on Post 4', creationDate: new Date(), blogPost: new ObjectId('65358fbc57b7be93b0eb8a99') },
    ];

    // Insert sample data into MongoDB collections
    const usersCollection = db.collection('users');
    const blogPostsCollection = db.collection('blogPosts');
    const commentsCollection = db.collection('comments');

    await usersCollection.insertMany(users);
    await blogPostsCollection.insertMany(blogPosts);
    await commentsCollection.insertMany(comments);

    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB closed.');
  }
}

populateDatabase();
