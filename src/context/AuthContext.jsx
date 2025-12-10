import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (userData, jwtToken) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', jwtToken);
        setUser(userData);
        setToken(jwtToken);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};