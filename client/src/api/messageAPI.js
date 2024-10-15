import axios from 'axios';

const API_URL = 'http://localhost:3001/api/messages';





const getToken = () => localStorage.getItem('token'); 





export const getAllMessages = async () => {

    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

export const sendMessage = async (messageData) => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
    };

    const response = await axios.post(`${API_URL}/send`, messageData, config);
    return response.data;
};
