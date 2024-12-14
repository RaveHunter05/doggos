'use client';

import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { z } from 'zod';

import { useEthers } from '@/context/EthersContext';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

import { Spinner } from '@/components/ui/spinner';

// custom
import { InputWithLabel } from '@/components/inputs/InputWithLabel';
import { SelectInputWithLabel } from '@/components/inputs/SelectInputWithLabel';

const petSchema = z.object({
    name: z.string(),
    sex: z.string().nonempty(),
    age: z.coerce.number().int().positive(),
    status: z.string().nonempty(),
    weight: z.coerce.number().int().positive(),
});

const MintPets: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const { getContract } = useEthers();

    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            name: '',
            sex: '',
            age: 0,
            status: '',
            weight: 0,
        },
        resolver: zodResolver(petSchema),
    });

    const onSubmit = async (values: z.infer<typeof petSchema>) => {
        const { name, sex, age, status, weight } = values;
        const contract = getContract();
        if (!contract) {
            console.error('Contract not found');
            return;
        }

        try {
            setLoading(true);
            const transaction = await contract.mintAnimal(
                name,
                sex,
                age,
                status,
                weight,
            );

            console.log('transaction sended', transaction);

            toast({
                title: 'Success',
                description:
                    'Se está procesando la transacción, podría tardar unos minutos',
                action: (
                    <ToastAction
                        onClick={() =>
                            navigator.clipboard.writeText(transaction.hash)
                        }
                        altText="Copy"
                    />
                ),
            });
        } catch (error) {
            console.error('Error in onSubmit: ', error);
            toast({
                title: 'Error',
                description: 'Error al registrar la mascota',
            });
        } finally {
            setLoading(false);
            form.reset();
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <InputWithLabel fieldTitle="Nombre" nameInSchema="name" />

                <SelectInputWithLabel
                    fieldTitle="Sexo"
                    nameInSchema="sex"
                    options={[
                        { label: 'Macho', value: 'male' },
                        {
                            label: 'Hembra',
                            value: 'female',
                        },
                    ]}
                />

                <InputWithLabel
                    fieldTitle="Edad"
                    nameInSchema="age"
                    inputType="number"
                />

                <SelectInputWithLabel
                    fieldTitle="Estado"
                    nameInSchema="status"
                    options={[
                        { label: 'Viva', value: 'alive' },
                        { label: 'Muerta', value: 'dead' },
                    ]}
                />

                <InputWithLabel
                    fieldTitle="Peso (Libras)"
                    nameInSchema="weight"
                    inputType="number"
                />

                <div className="mt-8">
                    <Button type="submit">
                        Crear mascota
                        {loading && (
                            <Spinner className="text-white" size="small" show />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default MintPets;
