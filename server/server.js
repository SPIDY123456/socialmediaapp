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
 
 app.use("/api/messages",(req,res,next)=> {
    req.io=io;
    next();
 },require('./routes/messageRoutes'));

app.use("/api/groups",(req,res,next)=> {
 req.io = io;
 next();
},require('./routes/groupRoutes'));


app.use("/api/streams",(req,res,next)=> {
    req.io = io;
    next();
 },require('./routes/streamRoutes'));






const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"],
    },

});

let onlineUsers =  new Map();


io.on('connection', (socket) => {
    console.log('User Connected', socket.id);

    socket.on('newPost', (post) => {
        io.emit('newPost', post);
    });


    socket.on('newStory', (story) => {
        // Broadcast the new story to all connected users
        io.emit('newStory', story);
    });

    socket.on('joins',(userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} joined`, onlineUsers);
    });

    socket.on('sendMessage',({recipientId,message}) => {
        const recipientSocketId = onlineUsers.get(recipientId);
        if(recipientSocketId){
            io.to(recipientSocketId).emit('reciveMessage', message);
        }
      });
 
      socket.on('sendGroupMessage',({groupId,message})=> {
          
        socket.to(groupId).emit('sendGroupMessage',message)
      })

      socket.on('joinstream',({streamId,userId})=> {
        socket.join(streamId);
        console.log(`User ${userId} joined stream ${streamId}`);
      });

      socket.on('liveStreamNotifications',(notification)=> {
        io.emit('recievedStreamNotification',notification)
      });

    socket.on('disconnect', () => {
        console.log('User Disconnected',socket.id);

 for (let [userId, socketId] of onlineUsers.entries()){
    if(socketId === socket.id){
        onlineUsers.delete(userId);
        break;
    }
}
    });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`);

})


    
