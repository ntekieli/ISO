import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export const RedirectBasedOnAuth = () => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Navigate to="/posts" replace /> : <Navigate to="/account" replace />;
};
