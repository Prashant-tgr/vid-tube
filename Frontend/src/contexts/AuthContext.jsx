import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);  // New: For storing error messages

    const login = async (email, password) => {
        try {
            setError(null);  // Clear previous errors
            const response = await axios.post('http://localhost:8000/api/v1/users/login', { email, password });
            const { accessToken, refreshToken, user: userData } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUser(userData);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');  // New: Capture backend error
            return false;
        }
    };

    const register = async (formData) => {
        try {
            setError(null);  // Clear previous errors
            const response = await axios.post('http://localhost:8000/api/v1/users/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            const { accessToken, refreshToken, user: userData } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            setUser(userData);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');  // New: Capture backend error
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setError(null);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Optionally validate token and set user
            setUser({}); // Placeholder
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};