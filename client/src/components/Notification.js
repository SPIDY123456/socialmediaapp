// components/Notifications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const { API_URL } = `http://localhost:3001`;

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const res = await axios.get(`${API_URL}/notifications/${userId}`);
            setNotifications(res.data);
        };

        fetchNotifications();
    }, [userId]);

    const markAsRead = async () => {
        await axios.put('/notifications/read', { userId });
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    };

    return (
        <div>
            <h3 className="text-lg font-bold">Notifications</h3>
            <button className="text-sm text-blue-500" onClick={markAsRead}>
                Mark all as read
            </button>
            <ul>
                {notifications.map((notif) => (
                    <li key={notif._id} className={`${notif.isRead ? 'text-gray-500' : 'text-black'}`}>
                        {notif.type === 'like' && (
                            <p>{notif.fromUser.username} liked your post</p>
                        )}
                        {notif.type === 'comment' && (
                            <p>{notif.fromUser.username} commented on your post</p>
                        )}
                        {notif.type === 'follow' && (
                            <p>{notif.fromUser.username} followed you</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
