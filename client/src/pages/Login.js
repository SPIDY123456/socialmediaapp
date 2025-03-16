import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = `https://socialmediaapp-cxsr.onrender.com`;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const { data } = await axios.post(`${API_URL}/api/users/login`,
                JSON.stringify({ email, password }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            localStorage.setItem('token', data.token);
            alert('Login Successful');
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in', error);
            setError(
                error.response?.data?.message || 
                'Failed to login. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />
                    
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className={`bg-purple-600 text-white p-2 w-full rounded transition duration-200 ${
                            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
                        }`}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
