const { Post, User } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, UserId: userId });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: User });
  res.json(posts);
};
