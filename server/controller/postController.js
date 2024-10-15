const asyncHandler = require('express-async-handler');
const Post = require('../model/Post');
const User = require('../model/User');

const createPost =  asyncHandler(async ( req,res) => {
    const {caption,image,likes,comments} = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    try{
    const post = await Post.create({
        user: req.user.id,
        username:user.username,
        caption,    
        image,
        likes,
        comments,
        profilePicture:user.profilePicture,
    });

        if (req.io) {
            req.io.emit('newPost', post); 
        } else {
            console.error("Socket.io instance (req.io) is not available");
        }


    res.status(201).json(post);
}
catch(error){
    console.error(error);
    res.status(500).json({message: 'Server Error'})
}
    

});


const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().populate('user', 'name avatar').sort({cretedAt: -1})
    res.json(posts)
});

const likePost = asyncHandler(async (req, res) => {
    try {
        console.log('Post ID from request:', req.params.id);
        console.log('User ID:', req.user._id);

        const post = await Post.findById(req.params.id);

        if (post) {
            if (!post.likes.includes(req.user._id.toString())) {
                post.likes.push(req.user._id);
                await post.save();
                return res.status(200).json({ message: 'Post liked' });
            } else {
                return res.status(400).json({ message: 'You have already liked this post' });
            }
        } else {
            return res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error liking post:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});



const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get post ID from URL parameters

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user is authorized to delete this post
        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await post.deleteOne();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});



const commentPost = asyncHandler(async (req, res) => {
    const { text, username } = req.body;

    // Check if text is provided
    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    try {
        // Log the post ID
        console.log('Post ID from request:', req.params.id);

        // Find the post by ID
        const post = await Post.findById(req.params.id);

        // Check if post exists
        if (post) {
            const comment = {
                user: req.user._id, // Ensure req.user is set correctly by your middleware
                text,
                username,
            };

            // Push the comment to the post's comments array
            post.comments.push(comment);

            // Save the updated post
            await post.save();

            return res.status(201).json({ message: "Comment added", comment });
        } else {
            return res.status(404).json({ message: "comment not found" });
        }
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Server error" });
    }
});


module.exports = {createPost,getPosts,deletePost,likePost,commentPost};





