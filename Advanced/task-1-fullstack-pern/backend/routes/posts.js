const express = require('express');
const { createPost, listPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', protect, createPost);
router.get('/', listPosts);
module.exports = router;
