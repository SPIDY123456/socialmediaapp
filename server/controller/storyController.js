const asyncHandler = require('express-async-handler');
const Story = require('../model/Story');
const User = require('../model/User');

const createStory = asyncHandler(async (req, res) => {
    const { content } = req.body;

    // Fetch the user based on the authenticated user ID
    const user = await User.findById(req.user._id).select('username profilePicture'); // Select specific fields
    console.log("Fetched User:", user); // Log user details

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!content) {
        return res.status(400).json({ message: 'Story content is required' });
    }

    try {
        const story = await Story.create({
            user: req.user._id,
            username: user.username, // Should not be empty
            content,
            profilePicture: user.profilePicture || '', // Fallback
        });

        console.log("Created Story:", story); // Log the created story
        
        if (req.io) {
            req.io.emit('newStory', story);
        } else {
            console.error("Socket.io instance (req.io) is not available");
        }
        
        return res.status(201).json(story);
    } catch (error) {
        console.error("Error creating story:", error);
        return res.status(500).json({ message: 'Error creating story' });
    }
});


const getAllStories = asyncHandler(async (req, res) => {
    try{
    const stories = await Story.find()
        .populate('user', 'username profilePicture') 
        .sort({ createdAt: -1 });

    res.status(200).json(stories);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


const getUserStories = asyncHandler(async (req, res) => {
    const userId = req.params.userId; // Use userId, not storyId

    try {
        const stories = await Story.find({ user: userId }).sort({ createdAt: -1 });

        if (!stories || stories.length === 0) {
            return res.status(404).json({ message: 'No stories found for this user' });
        }

        res.status(200).json(stories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = {createStory,getAllStories,getUserStories}
