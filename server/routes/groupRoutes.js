const express = require('express');
const { createGroup, addMember, sendMessage, getGroups,getAllGroups,getGroupMessages } = require('../controller/groupController')
const { protect } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

const router = express.Router();


router.post('/',protect, createGroup);
router.post('/:groupId/addMember', protect, addMember);
router.post('/:groupId/messages', protect, sendMessage);
router.get('/', protect, getGroups);
router.get('/groups',protect,getAllGroups)
router.get('/:groupId/message', protect, getGroupMessages);

module.exports = router;
