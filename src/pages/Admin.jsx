import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/ui/login-form';

const Admin = () => {
    const navigate = useNavigate();
    const handleLoginSuccess = () => {
        navigate('/admindashboard');
    };
    return (
        <div className="flex items-center justify-center h-screen w-screen flex-col">
            <h1 className="text-2xl text-orange-700 font-bold pb-10">Admin Login</h1>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default Admin
