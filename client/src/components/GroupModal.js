import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Close icon

const GroupModal = ({ group, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-200 rounded-lg shadow-lg w-full h-auto max-w-4xl p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition"
                    onClick={closeModal}
                >
                    <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{group.name}</h2>
                <p className="text-gray-400 text-sm -mt-4 mb-4"> BroadCast channel ·{group.members.length} members</p>
                <div className={`overflow-y-auto ${group.messages.length > 3 ? 'max-h-96' : 'max-h-full'}`}>
                    <ul className="space-y-2">
                        {group.messages.map((messages, index) => (
                            <li key={index} className="text-gray-600 mb-6">
                                <img
                                    src="https://i.pinimg.com/736x/89/d2/e7/89d2e7f822162f3550c13d302244116c.jpg" 
                                    alt="Ronaldo"
                                    className="rounded-full w-10 h-10"
                                />
                                <div className="bg-white text-gray-800 rounded-lg p-3 shadow-sm max-w-xs -mt-10 ml-12">
                                    {messages.content}
                                    <p className="absolute text-gray-500 text-xs whitespace-nowrap ml-44 -mt-1">{new Date(messages.timestamp).toLocaleString()}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GroupModal;
