import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

type Props<S> = {
    fieldTitle: string;
    nameInSchema: string;
    className?: string;
    inputType?: string;
    showLabel?: boolean;
} & InputHTMLAttributes<S>;

export function InputWithLabel<S>({
    fieldTitle,
    nameInSchema,
    className,
    inputType,
    showLabel = true,
}: Props<S>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    {showLabel && (
                        <FormLabel htmlFor={nameInSchema}>
                            {fieldTitle}
                        </FormLabel>
                    )}
                    <FormControl>
                        <Input
                            id={nameInSchema}
                            placeholder={fieldTitle}
                            className={className}
                            type={inputType ? inputType : 'text'}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
