import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar';


import { Dog, FileClock, List, NotebookPen, Wallet } from 'lucide-react';
import ConnectWalletButton from '../ConnectWalletButton';

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
        <div>
            <AppSideBar />
            <Sidebar collapsible="icon">
                <SidebarHeader className="flex items-center justify-center">
                    <Dog />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            <h1 className="text-2xl font-bold text-gray-900">
                                <a href="/">Doggos</a>
                            </h1>
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="mt-4">
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
        </div>
    );
};

export default AppSideBar;
