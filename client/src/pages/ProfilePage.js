import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons'; // Icons for grid and list views

const API_URL = 'http://localhost:3001';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [followersModalOpen, setFollowersModalOpen] = useState(false);
    const [followingModalOpen, setFollowingModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // State for toggling view mode
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const handlehome = () => {
        navigate('/');
    };

    return (
        <div className="container w-xl mx-auto p-4">
            <div className="bg-white shadow-xl rounded-xl p-8">
                <h1 className="text-4xl font-semibold text-center mb-4">{user.username}</h1>
                {user ? (
                    <div className="flex flex-col items-center">
                        <img
                            src={user.profilePicture}
                            alt={`${user.name}'s profile`}
                            className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
                        />
                        <h2 className="text-xl font-bold ml-4">{user.username}</h2> 
                        <p className="text-gray-600 text-sm ml-4 mb-10">{user.email}</p>
                        <p className="text-xl font-semibold -mt-5 mb-8 ">{user.bio}</p>

                        {/* Post count */}
                        <div className=" flex space-x-5 ">
                            <div className="text-center">
                                <p className="font-bold">{user.posts.length}</p>
                                <p className="text-gray-500">posts</p>
                            </div>
                            <div className="text-center  cursor-pointer" onClick={() => setFollowersModalOpen(true)}>
                                <p className="font-bold ml-4">{user.followers.length}</p>
                                <p className="text-gray-500 ml-4">followers</p>
                            </div>
                            <div className="text-center cursor-pointer mb-8" onClick={() => setFollowingModalOpen(true)}>
                                <p className="font-bold">{user.following.length}</p>
                                <p className="text-gray-500">following</p>
                            </div>
                        </div>
                        {/* Edit Profile and Share Profile Buttons */}
                        <div className="flex space-x-4">
                            <button className="bg-gray-200 text-black font-semibold py-2 px-4 rounded hover:bg-gray-300 transition duration-200 ml-2 ">
                                Edit profile
                            </button>
                            <button className="bg-gray-200 text-black font-semibold py-2 px-4 rounded hover:bg-gray-300 transition duration-200">
                                Share profile
                            </button>
                            <button onClick={handlehome} className="bg-gray-200 text-black font-semibold py-2 px-4 rounded hover:bg-gray-300 transition duration-200">
                                Home
                            </button>
                        </div>

                        {/* View Toggle Buttons */}
                        <div className="flex space-x-12 mt-6">
                            <button
                                className={` py-2 w-56 px-4 rounded hover:bg-white transition duration-200 ${viewMode === 'grid' ? 'bg-white' : 'bg-white'}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <FontAwesomeIcon icon={faTh} style={{ fontSize: '24px' }} /> 
                            </button>
                            <button
                                className={`py-2 px-4 rounded  hover:bg-white transition duration-200 ${viewMode === 'list' ? 'bg-white' : 'bg-white'}`}
                                onClick={() => setViewMode('list')}
                            >
                                <FontAwesomeIcon icon={faList} style={{ fontSize: '24px' }} /> 
                            </button>
                        </div>

                        {/* Render Posts */}
                        <div className=" ml-96">
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-3 gap-4">
                                    {user.posts.map((post) => (
                                        <div
                                            key={post._id}
                                            className="w-full h-full cursor-pointer"
                                            onClick={() => navigate(`/posts/${post._id}`)}
                                        >
                                            <img
                                                src={post.image}
                                                alt="User post"
                                                className="object-cover w-full h-full rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {user.posts.map((post) => (
                                        <li
                                            key={post._id}
                                            className="cursor-pointer flex items-center space-x-4"
                                            onClick={() => navigate(`/posts/${post._id}`)}
                                        >
                                            <img
                                                src={post.image}
                                                alt="User post"
                                                className=" mr-20 w-16 h-16 object-cover rounded-md"
                                            />
                                          
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Followers Modal */}
                        <Modal
                            isOpen={followersModalOpen}
                            onRequestClose={() => setFollowersModalOpen(false)}
                            style={customStyles}
                        >
                            <h2 className="text-xl font-bold mb-4">Followers</h2>
                            <ul>
                                {user.followers.map((follower) => (
                                    <li key={follower._id} className="mb-2 flex items-center">
                                        <img
                                            src={follower.profilePicture || 'https://defaulturl.com/default-profile.png'}
                                            alt={`${follower.name}'s profile`}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <span>{follower.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setFollowersModalOpen(false)} className="bg-gray-300 mt-4">
                                Close
                            </button>
                        </Modal>

                        {/* Following Modal */}
                        <Modal
                            isOpen={followingModalOpen}
                            onRequestClose={() => setFollowingModalOpen(false)}
                            style={customStyles}
                        >
                            <h2 className="text-xl font-bold mb-4">Following</h2>
                            <ul>
                                {user.following.map((following) => (
                                    <li key={following._id} className="mb-2 flex items-center">
                                        <img
                                            src={following.profilePicture || 'https://defaulturl.com/default-profile.png'}
                                            alt={`${following.name}'s profile`}
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                        <span>{following.name}</span>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => setFollowingModalOpen(false)} className="bg-gray-300 mt-4">
                                Close
                            </button>
                        </Modal>
                    </div>
                ) : (
                    <p className="text-gray-500">No user data available.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
