const express = require('express');
const {sendMessage , getMessages,getAllMessages} = require('../controller/messageController');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send',protect,sendMessage);
router.get('/user/:userId', protect, getMessages);
router.get('/',getAllMessages)

module.exports = router;