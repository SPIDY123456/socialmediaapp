const jwt = require('jsonwebtoken');

const User = require('../model/User');


const protect = async (req,res,next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    try{
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password')
        
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next();

    }
    catch(error){
        console.error(error);
        res.status(401).json({message: 'No authorization token failed'});
    }
    if(!token){
        res.status(401).json({message: 'No authorization no token '});
    }
}

module.exports = { protect };