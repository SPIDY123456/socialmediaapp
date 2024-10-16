import axios from 'axios';

const API_URL = 'https://socialmediaapp-cxsr.onrender.com/api/groups';


const getToken = () => localStorage.getItem('token'); // Adjust this based on where you're storing the token

export const getGroups = async () => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
    };

    const response = await axios.get(`${API_URL}/`, config);
    return response.data;
};

export const createGroup = async (groupData) => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
    };

    const response = await axios.post(`${API_URL}/create`, groupData, config);
    return response.data;
};
