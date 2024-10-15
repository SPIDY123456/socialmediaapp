import React, { useEffect, useState } from 'react';
import { getAllMessages } from "../api/messageAPI";
import {useNavigate} from "react-router-dom"

const MessagesPage = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await getAllMessages();
                console.log(data);
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    const handleHome  = () => {
        navigate('/')
    }

    return (
        <div className="p-5 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">Messages</h1>
            <div className="w-full max-w-3xl space-y-4">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div key={message._id} className="space-y-2">
                            {/* Sender's message aligned to the right */}
                            {message.senderUsername === "cristiano" ? (
                                <div className="flex justify-end">
                                    <div className="bg-blue-500 text-white p-4 rounded-lg max-w-xs shadow-md">
                                        <p className="font-semibold">{message.senderUsername}</p>
                                        <p>{message.content}</p>
                                        <p className="text-xs text-gray-200 mt-2 ml-32">
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                /* Recipient's message aligned to the left */
                                <div className="flex justify-start">
                                    <div className="bg-gray-300 text-gray-900 p-4 rounded-lg max-w-xs shadow-md">
                                        <p className="font-semibold">{message.senderUsername}</p>
                                        <p>{message.content}</p>
                                        <p className="text-xs text-gray-600 mt-2 ml-44">
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No messages found.</p>
                )}
                <button className='bg-green-300 rounded-lg ml-80 w-20 font-semibold text-black p-2 px-2' onClick={handleHome}>Back </button>
            </div>
        </div>
    );
};

export default MessagesPage;
