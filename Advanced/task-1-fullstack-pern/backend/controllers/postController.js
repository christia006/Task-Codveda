const { Post } = require('../models');
exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, UserId: req.user.id });
  res.json(post);
};
exports.listPosts = async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
};
