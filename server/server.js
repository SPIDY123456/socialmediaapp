const cors = require('cors');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/users',require("./routes/userRoutes"));
app.use("/api/posts",(req,res,next)=> {
    req.io = io;
    next();
 },require("./routes/postRoutes"));

 app.use("/api/stories",(req,res,next)=> {
    req.io=io;
    next();
 },require("./routes/storyRoutes"));


const PORT = process.env.PORT || 3001;




const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
    },

});


io.on('connection', (socket) => {
    console.log('User Connected');

    socket.on('newPost', (post) => {
        io.emit('newPost', post);
    });

    socket.on('newStory', (story) => {
        // Broadcast the new story to all connected users
        io.emit('newStory', story);
    });



    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })  
})




server.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`);

})


    
