'use client';

import { useEffect, useState } from 'react';

import { useWeb3 } from '@/context/EthersContext';
import { FileClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function History() {
    const { getContract, account } = useWeb3();

    const [tokensOwned, setTokensOwned] = useState([]);

    useEffect(() => {
        const listOfTokensOwned = async () => {
            const contract = getContract();
            if (!contract) {
                console.error('Contract not found');
                return;
            }

            try {
                const token = await contract.balanceOf(account);

                setTokensOwned(token);
            } catch (error) {
                console.error(error);
            }
        };

        listOfTokensOwned();
    }, [account, getContract]);

    return (
        <div className="relative overflow-x-auto p-6">
            <h1 className="text-3xl font-bold dark:text-white mb-6 underline">
                <div className="flex items-center">
                    <FileClock className="mr-4" />
                    Historial
                </div>
            </h1>

            <p className="text-sm mb-6">
                Lista de tokens pertenecientes al owner del contrato.
            </p>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="text-blue-400">
                        Historial de tokens
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div>
                        <h3 className="font-bold">Tokens creados: </h3>
                        <p className="text-sm">{tokensOwned.toString()}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
