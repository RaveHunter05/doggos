import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { EthersProvider } from '@/context/EthersContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import HydrationGuard from '@/components/HydrationGuard';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
});

export const metadata: Metadata = {
    title: 'Doggos',
    description: 'Trazabilidad en la blockchain',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <EthersProvider>
                        <HydrationGuard>
                            <ProtectedRoute>{children}</ProtectedRoute>
                        </HydrationGuard>
                    </EthersProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
