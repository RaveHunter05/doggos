'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import AppSideBar from '@/components/SideBar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Spinner } from './ui/spinner';
import HydrationGuard from '@/components/HydrationGuard';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [loading, user, router]);

    // Handle loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner size="small" show></Spinner>
            </div>
        );
    }

    // Render nothing while redirecting unauthenticated users
    if (!user) {
        return <main>{children}</main>;
    }

    // Render the children if authenticated
    return (
        <HydrationGuard>
            <SidebarProvider>
                <AppSideBar />
                <main>{children}</main>
            </SidebarProvider>
        </HydrationGuard>
    );
};

export default ProtectedRoute;
