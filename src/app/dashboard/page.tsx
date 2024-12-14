'use client';

import AppSideBar from '@/components/layouts/SideBar';

export default function Dashboard() {
    return (
        <div className="flex flex-col md:flex-row">
            <AppSideBar />
            <main className="flex-1">
                <h2 className="text-3xl font-bold dark:text-white mb-6 underline">
                    SideBar
                </h2>
            </main>
        </div>
    );
}
