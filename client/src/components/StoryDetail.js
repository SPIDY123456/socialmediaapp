import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const API_URL = `http://localhost:3001`; // Your backend URL

const StoryDetail = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [stories, setStories] = useState([]);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0); // Track the current story index
    const [liked, setLiked] = useState(false); // Track like status
    const navigate = useNavigate(); // For navigation

    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the headers
                    },
                };

                // Fetch all stories for the specified user
                const { data } = await axios.get(`${API_URL}/api/stories/user/${id}`, config);

                // Sort stories by createdAt ascending (oldest first)
                const sortedStories = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                setStories(sortedStories); // Set the fetched stories
                setCurrentStoryIndex(0); // Start with the first story
                setLiked(false); // Reset like status for the first story
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        };

        fetchStories();
    }, [id, token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentStoryIndex < stories.length - 1) {
                setCurrentStoryIndex(currentStoryIndex + 1); // Go to the next story
            } else {
                navigate('/'); // Navigate back to home if no more stories
            }
        }, 10000); // Duration for each story display

        return () => clearTimeout(timer); // Clean up timer
    }, [currentStoryIndex, stories.length, navigate]);

    const handleLike = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            await axios.post(`${API_URL}/api/stories/${stories[currentStoryIndex]._id}/like`, {}, config);
            setLiked(!liked); // Toggle the like status
            console.log("Story liked!");
        } catch (error) {
            console.error("Error liking story:", error);
        }
    };

    if (!stories.length) return <div>Loading...</div>;

    // Access current story details
    const currentStory = stories[currentStoryIndex];

    return (
        <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md">
                <p className="absolute text-white text-lg -mt-40">{currentStory.username}</p>
                <p className="absolute text-lg text-white ml-24 -mt-40">{moment(currentStory.createdAt).fromNow()}</p>
                <img
                    src={currentStory.content}
                    alt="Story content"
                    className="w-full rounded-lg shadow-lg"
                />

                {/* Like button */}
                <div className="absolute bottom-4 left-4 -ml-4 -mb-32">
                    <button
                        onClick={handleLike}
                        className={`text-white text-2xl rounded-full p-2 ${liked ? 'bg-red-500' : 'bg-transparent border-white border-2'}`}
                    >
                        {liked ? '🤍' : '❤️'}
                    </button>
                </div>

                {/* Back button */}
                <div className="absolute bottom-4 w-full flex justify-center ml-48 -mb-32">
                    <button
                        onClick={() => navigate('/')}
                        className="text-white text-xl bg-gray-800 rounded-full px-4 py-2"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryDetail;
