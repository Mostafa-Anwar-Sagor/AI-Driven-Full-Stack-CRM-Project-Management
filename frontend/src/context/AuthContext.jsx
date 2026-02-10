import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('crm_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            authAPI.getMe()
                .then(res => { setUser(res.data); setLoading(false); })
                .catch(() => { logout(); setLoading(false); });
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (username, password) => {
        const res = await authAPI.login(username, password);
        const data = res.data;
        localStorage.setItem('crm_token', data.auth_token);
        localStorage.setItem('crm_user', JSON.stringify(data));
        setToken(data.auth_token);
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('crm_token');
        localStorage.removeItem('crm_user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
