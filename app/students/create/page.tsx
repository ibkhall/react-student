"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form
} from "@/components/ui/form"
import { TextField } from "@/components/text-field"
import axios from "axios"
import { useRouter } from "next/navigation"

// Validation du formulaire avec Zod
const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères.",
    }),
    age: z.coerce.number().int().positive().max(120, {
        message: "L'âge doit être un nombre entier positif inférieur ou égal à 120.",
    })
})

export default function CreateStudentPage() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            age: undefined // Changez ceci de 0 à undefined
        },
    })

    const router = useRouter()

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        console.log(data)
        const response = await axios.post('http://localhost:8080/students', data)
        

        if(response.status == 200) {
            router.push('/students')
        }
       

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 p-24">
               <TextField
                 control={form.control}
                 name={"name"}
                 label="Student Name"
               />

                <TextField
                    control={form.control}
                    name={"age"}
                    label="Student Age"
                    type="number"
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
