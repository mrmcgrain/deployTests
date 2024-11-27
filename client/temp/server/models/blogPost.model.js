// const mongoose = require('mongoose');

// const blogPostSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   author: {
//     type: String,
//     required: true
//   },
//   blogPosts: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// module.exports = BlogPost;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  blogPosts: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
  }
}, {
  timestamps: true
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
