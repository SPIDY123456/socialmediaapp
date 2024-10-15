import axios from 'axios';

const API_URL = 'http://localhost:3001/api/streams';





// Get the token from localStorage (or wherever it is stored)
const getToken = () => localStorage.getItem('token'); 


export const getStreamDetails = async (streamId) => {
    const token = getToken();
   

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    const response = await axios.get(`${API_URL}/${streamId}`, config);
    return response.data;
};

export const createStream = async (streamData) => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
    };

    const response = await axios.post(`${API_URL}/create`, streamData, config);
    return response.data;
};

export const joinStream = async (streamId) => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
    };

    const response = await axios.post(`${API_URL}/join/${streamId}`, {}, config);
    return response.data;
};

export const getAllStreams = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
} 
