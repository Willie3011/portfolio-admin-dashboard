import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/verify`, { withCredentials: true });

            if (response.data.authenticated) {
                setUser(response.data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/login`,
                { email, password },
                { withCredentials: true }
            );

            setUser(response.data.user);
            setIsAuthenticated(true);

            return response.data.user; // or response.data
        } catch (error) {
            throw new Error(
                error.response?.data?.error || "Login failed"
            );
        }
    };


    const logout = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true });
        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            login,
            logout,
            checkAuth
        }}>{children}</AuthContext.Provider>
    )
}