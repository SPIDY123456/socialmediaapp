const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    host: { type: String ,required: true },
    participants: [{ type: String }], 
    profilePicture:{type: String},
    messages: [{
        sender: { type: String, required: true }, 
        content: { type: String, required: true }, 
        timestamp: { type: Date, default: Date.now } 
    }],
    isLive: { type: Boolean, default: true }, 
    createdAt: { type: Date, default: Date.now }, 
    endTime:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Stream', streamSchema);
