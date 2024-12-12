import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

type Props<S> = {
    fieldTitle: string;
    nameInSchema: string;
    className?: string;
    options: Array<{ value: string; label: string }>;
} & InputHTMLAttributes<S>;

export function SelectInputWithLabel<S>({
    fieldTitle,
    nameInSchema,
    className,
    options,
}: Props<S>) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({field}) => (
                <FormItem>
                    <FormLabel htmlFor={nameInSchema}> {fieldTitle} </FormLabel>
                    <FormControl>
                        <Select
                            placeholder={fieldTitle}
			    onValueChange={field.onChange}
			    defaultValue={field.value}
                            className={className}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={fieldTitle} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
