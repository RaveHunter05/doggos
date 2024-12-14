'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import DoggosIcon from '@/assets/icons/doggos-icon.svg';
import MetamaskIcon from '@/assets/icons/metamask.svg';
import GoogleIcon from '@/assets/icons/google.svg';
import DoggosLoginBackground from '@/assets/backgrounds/login.svg';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const { loginWithGoogle, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect to home if already logged in
        if (user) {
            router.replace('/');
        }
    }, [user, router]);

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (error) {
            console.error('Google Login Failed:', error);
        }
    };

    return (
        !user && (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
                    {/* Left Section: Login Form */}
                    <div className="w-full md:w-1/2 p-6">
                        <Image
                            src={DoggosIcon}
                            width={160}
                            height={160}
                            alt="Doggos Home"
                            className="object-cover self-center justify-self-center"
                        />
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            Welcome to Doggos
                        </h1>
                        <p className="text-gray-600 mb-6">
                            We're glad to have you here. Log in to continue
                            exploring our pet-focused platform.
                        </p>

                        {/* Login Buttons */}
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-white-500 text-black font-medium rounded shadow hover:bg-gray-200 transition"
                            >
                                <Image
                                    src={GoogleIcon}
                                    alt="Google"
                                    className="object-cover w-5 h-5"
                                />
                                Login with Google
                            </button>

                            <button
                                disabled
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-400 text-white font-medium rounded shadow cursor-not-allowed"
                            >
                                <Image
                                    src={MetamaskIcon}
                                    alt="Google"
                                    className="object-cover w-5 h-5"
                                />
                                Login with MetaMask (Coming Soon)
                            </button>
                        </div>
                    </div>

                    {/* Right Section: Illustration */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto">
                        <Image
                            src={DoggosLoginBackground}
                            width={80}
                            height={80}
                            alt="Doggos Login"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        )
    );
};

export default Login;
