'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { NotebookPen } from 'lucide-react';
import MintCows from '@/components/forms/MintCows';

export default function Registry() {
    return (
        <div className="relative overflow-x-auto p-6">
            <h1 className="text-3xl font-bold dark:text-white mb-6 underline">
                <div className="flex items-center">
                    <NotebookPen className="mr-4" />
                    Registro
                </div>

                <div className="mt-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="">Registrar Nueva Vaca</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle> Crear Vaca </DialogTitle>
                                <DialogDescription>
                                    Crear NFT de una vaca en la blockchain de
                                    Ethereum.
                                </DialogDescription>
                            </DialogHeader>

                            <MintCows />
                        </DialogContent>
                    </Dialog>
                </div>
            </h1>
        </div>
    );
}
