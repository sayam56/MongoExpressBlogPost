const { ObjectId } = require('mongodb');

class BlogPosts {
    constructor(title, content, author, tags) {
      this.title = title;
      this.content = content;
      this.author = new ObjectId(author);
      this.creationDate = new Date();
      this.tags = tags || [];
    }
  }
  
  module.exports = BlogPosts;
  