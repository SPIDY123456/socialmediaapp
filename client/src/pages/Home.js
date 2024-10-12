import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../components/Post"; 
import { io } from "socket.io-client";

const API_URL = `http://localhost:3001`; 

const socket = io(API_URL, {
    transports: ['websocket', 'polling'], 
}); 

const Home = () => {
    const [posts, setPosts] = useState([]);
    const[stories,setStories] = useState([]);
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/posts`);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        socket.on('newPost', (post) => {
            console.log("Post received", post);
            setPosts(prevPosts => [post, ...prevPosts]); 
        });
        return () => {
            socket.off('newPost');
        };
    }, []);


    useEffect(() => {
        socket.on('newStory', (story) => {
            console.log("Story received", story);
            setStories(prevStories => [story, ...prevStories]); // Add new story to the front
        });

        return () => {
            socket.off('newStory');
        };
    }, []);


    

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });
    }, []);

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            {posts.map((post) => (
                <div key={post._id} className="post-container mb-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in-out p-4">
                    <Post post={post} />
                    {/* Displaying likes with usernames */}
                    {/* Displaying comments with usernames */}
                    <div className="comments mt-2">
                        {post.comments.map((comment) => (
                            <div key={comment.user} className="comment text-xs text-gray-500 mt-1">
                                <strong className="text-blue-600">{comment.username}:</strong> {comment.text}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
