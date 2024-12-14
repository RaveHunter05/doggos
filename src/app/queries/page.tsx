'use client';

import { useState } from 'react';

import { InputWithLabel } from '@/components/inputs/InputWithLabel';

import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { List } from 'lucide-react';

import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useWeb3 } from '@/context/EthersContext';

import { useToast } from '@/hooks/use-toast';
import { Dog } from '@/types/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const searchSchema = z.object({
    tokenId: z.coerce.number().int().positive(),
});

const sexMap = {
    male: 'Macho',
    female: 'Hembra',
};

const statusMap = {
    alive: 'Activo',
    dead: 'Fallecido',
};

export default function Queries() {
    const [loading, setLoading] = useState(false);
    const [tokenId, setTokenId] = useState(0);

    const { getContract } = useWeb3();
    const { toast } = useToast();

    const [animalData, setAnimalData] = useState<Partial<Dog>>();

    const form = useForm({
        defaultValues: {
            tokenId: '',
        },
        resolver: zodResolver(searchSchema),
    });

    const onSubmit = async (values: z.infer<typeof searchSchema>) => {
        const { tokenId } = values;
        const contract = getContract();
        if (!contract) {
            console.error('Contract not found');
            return;
        }

        try {
            setLoading(true);
            const result = await contract.getAnimal(tokenId);
            setTokenId(tokenId);

            setAnimalData(result);
        } catch (error) {
            console.error('Error in onSubmit: ', error);
            toast({
                title: 'Error',
                description: 'Error al buscar transacción',
            });
        } finally {
            setLoading(false);
            form.reset();
        }
    };
    return (
        <div className="relative overflow-x-auto p-6">
            <h1 className="text-3xl font-bold dark:text-white mb-6 underline">
                <div className="flex items-center">
                    <List className="mr-4" />
                    Consultas
                </div>
            </h1>

            <p className="text-sm mb-6">
                Uso de la función getAnimal para buscar un NFT (vaquita) por su
                tokenId.
            </p>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex space-x-4 w-full"
                >
                    <InputWithLabel
                        fieldTitle="Buscar por tokenId"
                        nameInSchema="tokenId"
                        showLabel={false}
                    />

                    <Button type="submit">
                        Buscar transacción
                        {loading && (
                            <Spinner className="text-white" size="small" show />
                        )}
                    </Button>
                </form>
            </Form>

            {animalData && (
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="text-blue-400">
                            Datos del NFT (vaquita)
                        </CardTitle>
                    </CardHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <CardContent>
                            <div className="mt-4">
                                <h3 className="font-bold">TokenID:</h3>
                                <p className="text-sm">{tokenId.toString()}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold">Nombre:</h3>
                                <p className="text-sm">{animalData.name}</p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold">Sexo:</h3>
                                <p className="text-sm">
                                    {animalData.sex
                                        ? sexMap[animalData.sex]
                                        : 'Desconocido'}
                                </p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold">Edad (meses):</h3>
                                <p className="text-sm">
                                    {animalData.age
                                        ? animalData.age.toString()
                                        : 'Desconocido'}
                                </p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold">Estado:</h3>
                                <p className="text-sm">
                                    {animalData?.status
                                        ? statusMap[animalData.status]
                                        : 'Desconocido'}
                                </p>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-bold">Peso (Kg):</h3>
                                <p className="text-sm">
                                    {animalData.weight
                                        ? animalData.weight.toString()
                                        : 'Desconocido'}
                                </p>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            )}
        </div>
    );
}
