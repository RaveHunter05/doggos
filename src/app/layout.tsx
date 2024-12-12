import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSideBar from '@/components/SideBar';
import { cookies } from 'next/headers';
import { EthersProvider } from '@/context/EthersContext';
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
                <EthersProvider>
                    <SidebarProvider defaultOpen={defaultOpen}>
                        <AppSideBar />

                        <main>
                            <SidebarTrigger />
                            {children}
                        </main>

                    </SidebarProvider>
                </EthersProvider>
		<Toaster />
            </body>
        </html>
    );
}
