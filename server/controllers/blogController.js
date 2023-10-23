const BlogPost = require('../models/blogPost');
const { ObjectId } = require('mongodb');

async function createBlogPost(blogCollection, title, content, author, tags) {
  const blogPost = new BlogPost(title, content, author, tags);
  const result = await blogCollection.insertOne(blogPost);
  return result;
}

async function getAllBlogPosts(blogCollection, filter = {}) {
  const blogPosts = await blogCollection.find(filter).toArray();
  return blogPosts;
}

async function getBlogPostById( blogCollection, postId) {
  const blogPost = await blogCollection.findOne({ _id: new ObjectId(postId) });
  return blogPost;
}

async function updateBlogPost( blogCollection, postId, updatedData) {
  const result = await blogCollection.updateOne(
    { _id: new ObjectId(postId) },
    { $set: updatedData }
  );
  return result.modifiedCount > 0;
}

async function deleteBlogPost(blogCollection, postId) {
  const result = await blogCollection.deleteOne({ _id: new ObjectId(postId) });
  return result.deletedCount > 0;
}

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
};
