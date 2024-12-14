'use client';
import React, { useEffect, useState } from 'react';

const HydrationGuard: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default HydrationGuard;
