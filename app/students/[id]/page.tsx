
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
import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

// Validation du formulaire avec Zod
const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères.",
    }),
    age: z.coerce.number().int().positive().max(120, {
        message: "L'âge doit être un nombre entier positif inférieur ou égal à 120.",
    })
})

export default function EditStudentPage() {

    // c'est un hook qui permet de récuper les paramétres depuis l'url de la page courante
    // Le nom du parametre correspond à nom du dossier de la page entre crochet comme [id]
    const {id} = useParams()
    const { } = useQuery({
        queryKey: ['students'],
        initialData: {},
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/students/'+id)
            const student = response.data

            form.setValue('name', student.name)
            form.setValue('age', student.age)

            return student
        }
    })

    // react-hook-form permet de manipuler facilement les formulaires avec la possibilité de valider les données avec zod
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            age: undefined
        },
    })


    // le router qui permet d'aller de page en page
    const router = useRouter()

    // la fonction de soumission une fois que le formulaire est valide
    async function onSubmit(data: z.infer<typeof FormSchema>) {

        console.log(data)
        const response = await axios.put(`http://localhost:8080/students/${id}`, data)


        // response.status permet de lire les statut HTTP envoyé par l'API(Spring Boot)
        if (response.status == 200) {
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
