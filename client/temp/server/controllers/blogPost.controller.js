// const BlogPost = require("../models/blogPost.model");

// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await BlogPost.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.addPost = async (req, res) => {
//   const { title, author, blogPosts, date } = req.body;
//   const newPost = new BlogPost({ title, author, blogPosts,date });

//   try {
//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.updatePost = async (req, res) => {
//   try {
//     const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.deletePost = async (req, res) => {
//   try {
//     const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
//     if (!deletedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.json({ message: "Post deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const BlogPost = require("../models/blogPost.model");
const path = require('path');
const fs = require("fs");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPost = async (req, res) => {
  console.log("add post hit",   req.files)
let url = ""

  if (req.files) {
    let image = req.files.image;
    image.name = image.name.replace(/\s/g, "");
    url = `/public/images/blogPosts/${image.name}`
    image.mv(
      path.resolve(process.cwd() + "/public/images/blogPosts/", image.name),
      async (err) => {
        if (err) {
          return res.status(500).send(err);
        }})}


  const { title, author, blogPosts } = req.body;
  // const imageUrl = `/uploads/blogImages/${image.name}`;
  const newPost = new BlogPost({ title, 
    author, 
    blogPosts, 
    date: new Date(), 
    imageUrl: url});

  try {
    console.log("try blick hit")
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


