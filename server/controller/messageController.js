
const asyncHandler = require('express-async-handler');
const Message = require('../model/Message');
const User = require('../model/User');

const sendMessage = asyncHandler(async (req, res) => {
    const { recipientUsername, content } = req.body;

    // Find the sender's username based on the authenticated user (req.user)
    const senderUser = await User.findById(req.user._id);

    if (!senderUser) {
        return res.status(404).json({ message: 'Sender user not found' });
    }

    // Find the recipient user based on the recipient's username
    const recipientUser = await User.findOne({ username: recipientUsername });
    if (!recipientUser) {
        return res.status(404).json({ message: 'Recipient not found' });
    }

    try {
        // Create and save the message with the sender's and recipient's usernames
        const message = new Message({
            senderUsername: senderUser.username,
            recipientUsername: recipientUser.username,
            content,
            timeStamp: Date.now(),
        });

        await message.save();

        if (req.io) {
            req.io.emit('sendMessage', message);
        }

        res.status(201).json(message);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

const getMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;
  
    const currentUsername = req.user.username;
    try {
       
        const messages = await Message.find({
            $or: [
                { senderUsername: userId, recipientUsername: currentUsername },  // Messages sent by userId
                { senderUsername: currentUsername, recipientUsername: userId }   // Messages received by userId
            ]
        }).sort({ timeStamp: 1 }); 

        res.status(200).json(messages); 
    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: 'Failed to get messages' });
    }
});

const getAllMessages = asyncHandler(async(req,res)=> {
    try {
    const messages = await Message.find().sort({ timeStamp: 1 })
    res.status(200).json(messages)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = { sendMessage ,getMessages, getAllMessages};
