import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        fetch('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Token ${token}`,
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            setIsLoading(false);
        })
        .catch(() => {
            setIsLoading(false);
        });
    }, []);

    const login = async (username, password) => {
        const response = await fetch('https://sandbox.academiadevelopers.com/api-auth/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setUser(data);
        } else {
            throw new Error('Credenciales incorrectas');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };

