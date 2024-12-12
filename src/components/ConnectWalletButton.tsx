'use client';

import { Cat, Copy, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useEthers } from '@/context/EthersContext';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover';
import { useToast } from '@/hooks/use-toast';

const ConnectWalletButton = () => {
    const { connectWallet, account } = useEthers();

    const [isConnected, setIsConnected] = useState(false);

    const { toast } = useToast();

    useEffect(() => {
        if (account) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }
    }, [account]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);

        toast({
            title: 'Copied to clipboard',
            description: 'Wallet address copied to clipboard',
        });
    };

    return (
        <div className="relative">
            {isConnected && account ? (
                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="max-w-44">
                                <Cat />
                                Connected
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent side="bottom" align="center">
                            <div className="p-3 space-y-3 bg-white border-2 rounded-lg mb-2 ml-2">
                                <h2 className="text-lg font-semibold flex items-center">
                                    Connected Wallet{' '}
                                    <Copy
                                        onClick={() => copyToClipboard(account)}
                                        size={15}
                                        className="cursor-pointer ml-4"
                                    />
                                </h2>
                                <p>{account}</p>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ) : (
                <div className="max-w-4">
                    <Button onClick={() => connectWallet()}>
                        <Wallet size={24} />
                        Connect Wallet
                    </Button>

                    <h2>{account}</h2>
                </div>
            )}
        </div>
    );
};

export default ConnectWalletButton;
