import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor del contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            });
    }, []);

    const login = (username, password) => {
        return fetch('https://sandbox.academiadevelopers.com/api-auth/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json().then((data) => {
                        localStorage.setItem('token', data.token);
                        setUser(data);
                        return data;
                    });
                } else {
                    throw new Error('Usuario o contraseña incorrectos');
                }
            });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
