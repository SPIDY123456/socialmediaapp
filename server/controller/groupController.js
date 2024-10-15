const asyncHandler = require('express-async-handler');
const Group = require('../model/Group')
const User = require('../model/User');

// Create a new group
const createGroup = asyncHandler(async (req, res) => {
    const { name, members, profilePicture } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Group name is required' });
    }

    const group = new Group({ name, members, profilePicture });
    await group.save();
    res.status(201).json(group);
});

// Add a member to the group
const addMember = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { memberId } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    const user = await User.findById(memberId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    group.members.push(memberId);
    await group.save();
    res.status(200).json(group);
});

// Send a message in the group
const sendMessage = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { sender, profilePicture, content } = req.body;

    const group = await Group.findById(groupId);
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    const message = {
        sender,
        profilePicture,
        content,
        timestamp: new Date()
    };

    group.messages.push(message);
    await group.save();

    if (req.io) {
        req.io.emit('sendGroupMessage', group);
    }
    res.status(201).json(group);
});

// Get all groups the user is a member of
const getGroups = asyncHandler(async (req, res) => {
    try{
    const userId = req.user._id;
    const groups = await Group.find({ members: userId }).populate('members', 'username profilePicture');
    res.status(200).json(groups);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }

});

// Example using Mongoose
const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find(); // Ensure no filters are applied here
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching groups' });
    }
};


// Get messages from a specific group
const getGroupMessages = asyncHandler(async (req, res) => {
    const { groupId } = req.params;

    const group = await Group.findById(groupId).populate('name', 'content profilePicture');
    if (!group) {
        return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group.messages);
});

module.exports = {
    createGroup,
    addMember,
    sendMessage,
    getGroups,
    getAllGroups,
    getGroupMessages
};
