import React, { useEffect, useState } from 'react';
import { getGroups } from '../api/groupAPI';
import GroupModal from '../components/GroupModal'; 

const GroupPage = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            const data = await getGroups();
            setGroups(data);
        };

        fetchGroups();
    }, []);

    const openModal = (group) => {
        setSelectedGroup(group);
    };

    const closeModal = () => {
        setSelectedGroup(null);
    };

    const handleHome = () => {
        window.location.href = '/'; // 
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold  text-center mb-6 text-gray-800">Groups</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groups.length > 0 ? (
                        groups.map((group) => (
                            <div
                                key={group._id}
                                className="bg-white shadow-md rounded-lg p-4 text-center  cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => openModal(group)} // Open modal on click
                            >
                                <h2 className="text-xl font-semibold mb-2 text-gray-900">{group.name}</h2>
                                <p className="text-gray-600">Members: {group.members.length}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-lg">No groups found.</p>
                    )}
                </div>
                <div className='flex justify-center'>
                    <button className=' bg-green-300 rounded-lg hover:bg-green-400 font-semibold  mt-96 w-20 text-black p-2 px-2' onClick={handleHome}>Back </button>
                </div>
            </div>

            {selectedGroup && (
                <GroupModal group={selectedGroup} closeModal={closeModal} />
            )}
        </div>
    );
};

export default GroupPage;
