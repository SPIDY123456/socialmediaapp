import React, { useState } from 'react';
import { FaHeart, FaComment, FaShare, FaEllipsisV, } from 'react-icons/fa';
import { BsSave } from "react-icons/bs";
import moment from "moment";

const Post = ({ post }) => {
  const timeAgo = moment(post.createdAt).fromNow();
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false); // State to handle modal visibility

  // Function to handle like action
  const handleLike = () => {
    const userId = "6706614b035440cb182baeb3"; 
    if (likes.includes(userId)) {
      setLikes(likes.filter((id) => id !== userId)); // Unlike
    } else {
      setLikes([...likes, userId]); // Like
    }
  };

  // Function to handle new comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        user: "67066d0e1eaa2c624683a4b2", // Replace with the current user's ID
        username: post.username, // Assuming you want to display the post's username
        text: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment(''); // Clear the input
    }
  };

  // Function to handle comment deletion
  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1); // Remove comment by index
    setComments(updatedComments); // Update the state
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 max-w-full">
      {/* Top section: User profile image, username, and 3 dots */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={post.profilePicture || "https://png.pngtree.com/png-clipart/20210619/ourmid/pngtree-cartoon-boy-instagram-social-media-avatar-png-image_3487325.jpg"}
            alt={`${post.username}'s profile`}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-bold">{post.username}</p>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <FaEllipsisV className="text-gray-600 cursor-pointer" />
      </div>

      {/* Post image */}
      <img src={post.image} alt="Post" className="w-full h-auto rounded-lg mb-4" />

      {/* Icons for like, comment, share, and additional options */}
      <div className="flex justify-between items-center mt-2 mb-4">
        <div className="flex space-x-4">
          <FaHeart
            className={`cursor-pointer hover:text-red-500 ${likes.includes("yourUserId") ? 'text-red-500' : 'text-gray-600'}`}
            size={20}
            onClick={handleLike}
          />
          <FaComment
            className="text-gray-600 cursor-pointer hover:text-blue-500"
            size={20}
            onClick={() => setShowCommentModal(true)} // Open modal on comment icon click
          />
          <FaShare className="text-gray-600 cursor-pointer hover:text-green-500" size={20} />
        </div>
        <div className="flex space-x-4">
          <BsSave className="text-gray-600 cursor-pointer hover:text-blue-500" size={20} />
          {/* <FaBell className="text-gray-600 cursor-pointer hover:text-yellow-500" size={20} /> */}
        </div>
      </div>

      {/* Post caption */}
      <div>
        <p className="text-md">
          <span className="font-bold mr-1">{post.username}</span>
          {post.caption}
        </p>
      </div>

      {/* Likes */}
      <div className="mt-4">
        <p className="text-sm font-bold">{likes.length} likes</p>
      </div>

      {/* Modal for comments */}
      {showCommentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <h2 className="text-lg font-bold mb-4">Comments</h2>
            <div className="overflow-y-auto max-h-60">
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx} className='border-t pt-2 flex justify-between items-center'>
                    <p className="text-sm">
                      <strong>{comment.username}:</strong> {comment.text}
                    </p>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => handleDeleteComment(idx)} // Delete comment
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>

            {/* New Comment Input */}
            <form onSubmit={handleCommentSubmit} className="mt-4 flex">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="border rounded px-2 py-1 flex-grow"
              />
              <button type="submit" className="text-blue-500 ml-4 font-bold">Post</button>
            </form>

            {/* Close modal button */}
            <button
              className="mt-4 text-red-500 font-bold"
              onClick={() => setShowCommentModal(false)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
