import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ fullname: '', email: '', username: '', password: '', avatar: null, coverImage: null });
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        const success = await register(data);
        if (success) navigate('/');
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name:</label>
                    <input name="fullname" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input name="username" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input name="password" type="password" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Avatar:</label>
                    <input name="avatar" type="file" onChange={handleChange} accept="image/*" required />
                </div>
                <div className="form-group">
                    <label>Cover Image (optional):</label>
                    <input name="coverImage" type="file" onChange={handleChange} accept="image/*" />
                </div>
                <button type="submit">Register</button>
            </form>
            <p className="auth-link">Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Register;