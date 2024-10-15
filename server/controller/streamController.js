const asyncHandler = require('express-async-handler');
const Stream = require('../model/Stream');
const User = require('../model/User');


const createStream = asyncHandler(async(req,res)=> {
    const {title} = req.body;

    const host = req.user.username;

    try {
        const stream = new Stream({title, host});
        await stream.save();

        if (req.io) {
            req.io.emit('liveStreamNotifications', stream);
        }
  
        res.status(201).json(stream);

    } catch (error) {
        res.status(500).json({ error: 'Failed to create stream' });
    }

    
});

const joinStream = asyncHandler(async (req, res) => {
    const { streamId } = req.params;
    console.log('User ID attempting to join:', req.user.id); // Log the user ID
    console.log('Stream ID:', streamId); // Log the stream ID

    try {
        const stream = await Stream.findById(streamId);
        if (!stream) return res.status(404).json({ error: 'Stream not found' });

        // Check if the user is already a viewer
        if (stream.participants.includes(req.user.username)) {
            return res.status(400).json({ error: 'You are already a viewer of this stream.' });
        }

        stream.participants.push(req.user.username);
        await stream.save();

        if (req.io) {
            req.io.emit('joinstream', stream);
        }

        res.status(201).json(stream);
    } catch (error) {
        console.error('Error joining stream:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to join stream' });
    }
});

const endStream = async (req, res) => {
    const { streamId } = req.params;


    try {
        const stream = await Stream.findByIdAndUpdate(streamId, { endTime: Date.now() }, { new: true });
        res.json(stream);
    } catch (error) {
        res.status(500).json({ error: 'Failed to end stream' });
    }
};


const sendMessageInStream = asyncHandler(async (req, res) => {
    const { streamId } = req.params;
    const { content } = req.body;

    try {
        const stream = await Stream.findById(streamId);

        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }

        const message = {
            sender: req.user.username, // Assuming you store username in req.user
            content,
        };

        stream.messages.push(message);
        await stream.save();

        res.status(201).json({ message: 'Message sent', stream });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
});

const deleteStream = asyncHandler(async(req,res)=> {
    const { streamId } = req.params;
    try{
        const stream = await Stream.findByIdAndDelete(streamId);
        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }
        res.status(200).json({ message: 'Stream deleted successfully' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

const getStreamDetails = asyncHandler(async (req, res) => {
    const { streamId } = req.params;

    try {
        const stream = await Stream.findById(streamId).populate('host', 'profilePicture').populate('participants', 'profilePicture');
        if (!stream) {
            return res.status(404).json({ message: 'Stream not found' });
        }

        res.status(200).json(stream);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stream details', error });
    }
});

const getAllStreams = asyncHandler(async (req, res) => {

    try {
    const streams = await Stream.find();
    res.status(200).json(streams);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
    })


module.exports = {createStream,joinStream,endStream,sendMessageInStream,deleteStream,getStreamDetails,getAllStreams}
