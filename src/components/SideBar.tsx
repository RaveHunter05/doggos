import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from './ui/sidebar';
import { FileClock, List, NotebookPen, Wallet } from 'lucide-react';
import Image from 'next/image';
import DoggosIcon from '@/assets/icons/doggos-icon.svg';
import ConnectWalletButton from './ConnectWalletButton';

const items = [
    {
        title: 'Registro',
        url: '/registry',
        icon: NotebookPen,
    },
    {
        title: 'Consultas',
        url: '/queries',
        icon: List,
    },
    {
        title: 'Historial',
        url: '/history',
        icon: FileClock,
    },
    {
        title: 'Mi Wallet',
        url: '/wallet',
        icon: Wallet,
    },
];

const AppSideBar: React.FC = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex items-center justify-center">
                <a
                    href="/"
                    className="flex items-center justify-start text-2xl font-bold text-gray-900"
                >
                    <Image
                        src={DoggosIcon}
                        width={80}
                        height={80}
                        alt="Doggos Home"
                    />
                    <span>Doggos</span>
                </a>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="mt-2">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a
                                            href={item.url}
                                            className="flex items-center gap-4"
                                        >
                                            <item.icon size={20} />

                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <ConnectWalletButton />
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSideBar;
