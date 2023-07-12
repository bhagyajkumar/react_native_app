import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import EncryptedStorage from 'react-native-encrypted-storage';

type Props = {
    children: React.ReactNode;
};

type AuthenticationType = {
    isLoggedin: boolean;
    authToken: string | null;
    loading: boolean;
    signup: (email: string, username: string, password: string) => Promise<any>;
    login: (username: string, password: string) => Promise<any>;
    logout: () => Promise<any>;
};

const AuthContext = createContext<AuthenticationType>({
    authToken: null,
    isLoggedin: false,
    loading: true,
    login: () => Promise.resolve(),
    signup: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
    const [authToken, setAuthToken] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        const checkAuthToken = async () => {
            try {
                const access = await EncryptedStorage.getItem("JWT-access");
                const refresh = await EncryptedStorage.getItem("JWT-refresh");
                if (access && refresh) {
                    setAuthToken(access);
                    setIsLoggedin(true);
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        checkAuthToken();
    }, []);

    const storeAuthToken = async (access: string, refresh: string) => {
        try {
            await EncryptedStorage.setItem("JWT-access", access);
            await EncryptedStorage.setItem("JWT-refresh", refresh);
            setAuthToken(access);
            setIsLoggedin(true);
        } catch (error) {
            console.log(error);
        }
    };

    const login = (username: string, password: string) => {
        return new Promise((resolve, reject) => {
            const data = {
                username: username,
                password: password,
            };

            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
            };

            fetch('https://api.dsawiz.bhagyaj.co.in/api/token/', options)
                .then(response => response.json())
                .then((response) => {
                    storeAuthToken(response.access, response.refresh);
                    resolve(response);
                })
                .catch(err => reject(err));
        });
    };

    const signup = (email: string, username: string, password: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const data = {
                email: email,
                username: username,
                password: password,
            };

            const options: RequestInit = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data),
            };

            fetch('https://api.dsawiz.bhagyaj.co.in/api/register/', options)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    };

    const logout = () => {
        return new Promise((resolve, reject) => {
            setAuthToken(null);
            setIsLoggedin(false);
            resolve(true);
        });
    };

    const value: AuthenticationType = {
        authToken,
        loading,
        signup,
        login,
        isLoggedin,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
