
const express = require('express');
const { createStream, joinStream, endStream, sendMessageInStream, deleteStream, getStreamDetails, getAllStreams } = require('../controller/streamController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/create', protect, createStream);
router.post('/join/:streamId', protect, joinStream);
router.post('/end/:streamId', protect, endStream);
router.post('/:streamId/message', protect, sendMessageInStream);
router.delete('/:streamId/delete',protect,deleteStream)
router.get('/:streamId', protect, getStreamDetails);
router.get('/',getAllStreams)


module.exports = router;
