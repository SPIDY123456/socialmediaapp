import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Navbar = ({ stories, user }) => {


   const navigate = useNavigate();

    const handleStoryClick = (storyId) => {
        navigate(`/stories/${storyId}`)
    };
    
   return (
        <nav className="bg-white p-4 w-full max-w-3xl mx-auto">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-black ml-6 text-lg font-bold">
                    Social App
                </Link>

                <div className="flex items-center space-x-4">
                    <FaBell className="text-black cursor-pointer" size={28} />
                    <FaPaperPlane className="text-black cursor-pointer" size={28} />
                </div>
            </div>

            <div className="mt-4 overflow-x-scroll flex space-x-4 px-4">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                        <img
                           src={user?.image || "https://i.pinimg.com/736x/d0/35/00/d035005784d4baa00f9dafdd9c44cdf0.jpg"}
                            alt={user ? `${user.username}'s story` : "Your Story"}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <p className="text-xs mt-1 text-black">Your Story</p>
                </div>

                {stories.map((story) => (
                    <div key={story._id} className="flex flex-col items-center cursor-pointer" onClick={() => handleStoryClick(story)}>
                        <div className="w-16 h-16 rounded-full border-2 border-red-500 p-1">
                            <img
                                src={story.profilePicture}
                                alt={`${story.username}'s story`}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <p className="text-xs mt-1 text-black">{story.username}</p>
                    </div>
                ))}
            </div>
        </nav>
    );
};

// Function to handle story click


export default Navbar;
