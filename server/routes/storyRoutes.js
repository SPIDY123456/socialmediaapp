const express = require('express');
const { createStory, getAllStories, getUserStories } = require('../controller/storyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/',protect, createStory);
router.get('/', getAllStories);
router.get('/user/:userId', protect, getUserStories);

module.exports = router;