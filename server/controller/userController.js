const asyncHandler = require('express-async-handler');
const User = require("../model/User");
const Post = require("../model/Post");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generatetoken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});

}


const registerUser = asyncHandler (async ( req,res) => {
    const { name, email, password, username, bio, profilePicture,followers=[],following=[]} = req.body;
    try {
        const userExists = await User.findOne({email});
        
        if(userExists) return res.status(400).json({error: 'User already exists'});

}
catch(error){
    console.error(error);
    return res.status(500).json({error: 'Server error'});
}


const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password: hashedPassword, username, profilePicture,bio,followers,following});

if(user){

res.status(201).json( { id: user._id, name: user.name, email: user.email, username: user.username, bio:user.bio, profilePicture:user.profilePicture, followers:user.followers,following:user.following,token : generatetoken(user._id),

})
} else {
    res.status(400).json({ error: 'Invalid user data' });
}
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
          .populate('followers', 'name email profilePicture')
          .populate('following', 'name email profilePicture');


        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                username:user.username,
                email: user.email,
                bio:user.bio,
                profilePicture:user.profilePicture,
                followers: user.followers,
                following: user.following,
                token: generatetoken(user._id),
            });

        } else {
            res.status(401).json({ message: 'Invalid email and password' });
        }
    } catch (error) {
        console.error('Error during login:', error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error' });  // Respond with a server error message
    }
});




const getUserProfile = (asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id)
        .populate('followers', 'name email bio profilePicture ')
        .populate('following', 'name email  bio profilePicture ');

    const posts = await Post.find({ user: req.user._id });

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            username:user.username,
            email: user.email,
            bio:user.bio,
            avatar:user.avatar,
            profilePicture:user.profilePicture,
            followers:user.followers,
            following:user.following,
            posts:posts,
        })
        }
    else {
        res.status(401).json({ message: " Couldnt get the user  "})
        
    }
}));

module.exports = {registerUser,loginUser,getUserProfile};
