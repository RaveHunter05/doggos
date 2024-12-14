import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Web3Provider } from '@/context/EthersContext';
import { Toaster } from '@/components/ui/toaster';

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
    description: 'Trazabilidad de ganado en la blockchain',
};

import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Web3Provider>
                    <SidebarProvider defaultOpen={defaultOpen}>
                        <main>{children}</main>
                    </SidebarProvider>
                </Web3Provider>
                <Toaster />
            </body>
        </html>
    );
}
