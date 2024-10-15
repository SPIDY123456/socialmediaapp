import React, { useEffect, useState } from 'react';
import { getAllStreams } from '../api/streamAPI';
import { useNavigate } from 'react-router-dom';

const StreamPage = () => {
    const [streams, setStreams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const data = await getAllStreams();
                setStreams(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching streams:', error);
            }
        };

        fetchStreams();
    }, []);

    const handleHome = () => {
        navigate('/');
    }

    // Function to calculate duration between two timestamps
    const calculateDuration = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const duration = Math.abs(end - start) / 1000; // Difference in seconds

        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);

        return hours > 0
            ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            : `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-3xl font-bold text-center mb-14 text-blue-600">Live Stream Details</h1>
            {streams.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {streams.map((stream) => (
                        <div key={stream._id} className="bg-white w-2xl h-60 shadow-lg rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">Stream created by : {stream.host}</h2>
                            <p className="text-lg font-semibold text-gray-700 mb-6">Title : {stream.title}</p>
                            <div className="text-lg font-semibold text-gray-700">
                                Messages:
                                {stream.messages && stream.messages.length > 0 ? (
                                    stream.messages.map((message) => (
                                        <div key={message._id} className='-mt-7 ml-24'>
                                            <p><strong>{message.sender} - </strong> {message.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No messages available.</p>
                                )}
                            </div>
                            <div className='flex justify-end ml-12'>
                            {stream.endTime && (
                                <p className="absolute bg-black text-white mt-8  p-2 rounded text-sm  text-center font-semibold">
                                     {calculateDuration(stream.createdAt, stream.endTime)}
                                </p>
                            )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">Loading streams...</p>
            )}
            <div className='flex justify-end'>
                <button className='bg-green-300 rounded-lg ml-auto font-semibold mt-96 w-20 hover:bg-green-400 text-black p-2 px-2' onClick={handleHome}>Back</button>
            </div>
        </div>
    );
};

export default StreamPage;
