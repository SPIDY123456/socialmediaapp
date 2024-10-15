const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    senderUsername: { type: String, required: true }, // Store sender's username
    recipientUsername: { type: String, required: true }, // Store recipient's username
    profilePicture: { type: String }, // Optional profile picture field for sender or recipient
    content: { type: String, required: true }, // The message content
    timestamp: { type: Date, default: Date.now } // Automatically store the timestamp
});

module.exports = mongoose.model('Message', messageSchema);
