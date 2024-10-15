const express = require('express');
const { createPost,getPosts,deletePost,likePost,commentPost} = require('../controller/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', protect, createPost);
router.get('/', getPosts);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);


module.exports = router;