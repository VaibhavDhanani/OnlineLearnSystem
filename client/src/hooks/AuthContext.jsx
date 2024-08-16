import React, { createContext, useContext, useEffect, useState } from 'react';
import getUserByToken from './TokenDecoder.js';
import { URL } from '../constant.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userId = getUserByToken(token);
                    const response = await fetch(`${URL}/user/${userId}`);
                    if (!response.ok) throw new Error('Failed to fetch user');
                    const userData = await response.json();
                    setUser(userData);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);
    
    const login = (token, userData) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);