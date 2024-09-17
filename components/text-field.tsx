'use client'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import React from "react"
import { Input } from "./ui/input"
import { Control, FieldValues } from "react-hook-form"

type TextFieldProps = {
    control: Control<any>
    name: string
    label: string,
    placeholder?: string
    description?: string
    type?: string
}

export const TextField: React.FC<TextFieldProps> = ({
    control,
    name,
    label,
    placeholder,
    description,
    type = 'text'
}) => {
    return <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input type={type} placeholder={placeholder} {...field} />
                </FormControl>
                <FormDescription>
                    {description}
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
}