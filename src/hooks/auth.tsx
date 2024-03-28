
import { createContext, useCallback, useContext, useEffect, useState } from "react";

import { users } from "../api";
import { client } from "../api/client";
import { TUserWithoutPassword } from "../api/fetchers/users";

type TAuthContext = {
    handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    isLoginLoading: boolean;
    loginError: any;
    profile: any;
    isProfileLoading: boolean;
    profileError: any;
}

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState<any>();

    const [profile, setProfile] = useState<TUserWithoutPassword>();
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState<any>();

    const handleLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoginError(null);
        setIsLoginLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            const response = await users.login({ email, password });

            setToken(response.token);
            localStorage.setItem('token', response.token);
        }
        catch (error) {
            console.log(error)
            setLoginError(error);
        } finally {
            setIsLoginLoading(false);
        }
    }, []);

    const loadProfile = useCallback(async () => {
        setProfileError(null);
        setIsProfileLoading(true);

        try {
            const response = await users.profile();
            setProfile(response.user);
        } catch (error) {
            setProfileError(error);
        } finally {
            setIsProfileLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const interceptor = client.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });

        loadProfile();

        return () => {
            client.interceptors.request.eject(interceptor);
        };
    }, [loadProfile, token]);

    return (
        <AuthContext.Provider value={{
            handleLogin, isLoginLoading, loginError, profile,
            isProfileLoading,
            profileError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }

    return context;
}