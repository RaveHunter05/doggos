'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            router.replace('/login'); // Redirect to login after logging out
        } catch (err) {
            console.error('Logout Failed:', err);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded shadow hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
