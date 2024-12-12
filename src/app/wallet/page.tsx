'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEthers } from '@/context/EthersContext';
import { WalletMinimal } from 'lucide-react';

export default function Wallet() {
    const { account, network, balance } = useEthers();

    return (
        <div className="relative overflow-x-auto p-6">
            <h1 className="text-3xl font-bold dark:text-white mb-6 underline">
                <div className="flex items-center">
                    <WalletMinimal className="mr-4" />
                    Mi Wallet
                </div>
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle className="text-blue-400">
                        Información de la wallet conectada
                    </CardTitle>
                </CardHeader>

                {account ? (
                    <CardContent>
                        <div className="mt-4">
                            <h3 className="font-bold">Balance:</h3>
                            <p className="text-sm">{balance} ETH</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">Network:</h3>
                            <p className="text-sm">{network?.name}</p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">ChainId:</h3>
                            <p className="text-sm">
                                {network?.chainId.toString()}
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">Address:</h3>
                            <p className="text-sm"> {account} </p>
                        </div>
                    </CardContent>
                ) : (
                    <CardContent>
                        <div className="mt-4">
                            <h3 className="font-bold">No wallet connected</h3>
                        </div>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
