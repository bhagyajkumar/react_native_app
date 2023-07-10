import {createContext, useContext, useEffect, useState } from "react";


type Props = {
    children: React.ReactNode
}

type AuthenticationType = {
    authToken:string,
    loading: boolean,
    signup: Function

}


const AuthContext = createContext<AuthenticationType | null>(null);

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: Props) => {
    const [authToken, setAuthToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // check the auth token here
        setAuthToken("sample")
        setLoading(false)
    })

    const signup = (email: string, username: string, password: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const data = {
                email: email,
                username: username,
                password: password
            };
    
            const options: RequestInit = {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            };
    
            fetch('https://api.dsawiz.bhagyaj.co.in/api/register/', options)
                .then(response => response.json())
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    };
    

    const value = {
        authToken,
        loading,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


}
