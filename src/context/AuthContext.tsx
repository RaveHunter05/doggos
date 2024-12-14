'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    db,
    doc,
    setDoc,
    getDoc,
    fetchSignInMethodsForEmail,
    linkWithCredential,
} from '@/firebase/firebase';
import type { UserCredential } from 'firebase/auth';

interface AuthContextType {
    user: any;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
    loginWithEmail: (
        email: string,
        password: string,
    ) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = doc(db, 'users', firebaseUser.uid);
                const userSnapshot = await getDoc(userDoc);
                if (!userSnapshot.exists()) {
                    await setDoc(userDoc, {
                        displayName: firebaseUser.displayName,
                        email: firebaseUser.email,
                        photoURL: firebaseUser.photoURL,
                        registeredAt: new Date().toISOString(),
                    });
                }
                setUser(firebaseUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const googleResult = await signInWithPopup(auth, googleProvider);

            const email = googleResult.user.email;
            if (!email) {
                console.error('Google account does not have an email.');
                return;
            }

            // Check if there's an email/password account with the same email
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.includes('password')) {
                // Email/password account exists -> Link the Google account
                const password = prompt(
                    'Enter your password to link your Google account:',
                );
                if (password) {
                    const emailCredential = EmailAuthProvider.credential(
                        email,
                        password,
                    );
                    try {
                        await linkWithCredential(
                            googleResult.user,
                            emailCredential,
                        );
                        console.log('Google account linked successfully.');
                    } catch (linkError) {
                        console.error('Failed to link accounts:', linkError);
                    }
                }
            }
        } catch (error) {
            console.error('Google Login Failed:', error);
        }
    };

    const loginWithEmail = async (
        email: string,
        password: string,
    ): Promise<UserCredential> => {
        try {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );

            // Check if the Google account is already linked
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (!signInMethods.includes(googleProvider.providerId)) {
                console.log(
                    'Google account is not linked. You can offer the option to link.',
                );
            }

            return result;
        } catch (error) {
            console.error('Email Login Failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Logout Failed:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, loginWithGoogle, loginWithEmail, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
