const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    username: { type: String }, // Post creator
    caption: { type: String, maxlength: 300, required: true }, // Caption for the post
    image: { type: String, required: true }, 
    profilePicture: { type: String },// Image URL
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the post
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            username: { type: String, required: true }, // User who commented
            text: { type: String}, // Comment text
            createdAt: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now },
   // Date the post was created
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
