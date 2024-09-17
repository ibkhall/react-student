'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"

/* 
// Cas d'un Server Component
export default async function StudentsPage() {
    const response = await fetch('http://localhost:8080/students')
    const students = await response.json()
    console.log(students)

    return <div>
        <h1>Students List</h1>
    </div>
} */


/* export default  function StudentsPage() {
// Cas d'un cliebt Component
    const [name, setName] = useState('')
    const [students, setStudents] = useState([])
    

    const onNameChange = (e) => {
        setName(e.target.value)
       
    }

    const saveStudent = async () => {
        const response = await axios.post('http://localhost:8080/students', {
            name: name
        })
    }

   useEffect(() => {
    async function fetchStudents() {
        const response = await axios.get('http://localhost:8080/students')
        console.log(response.data)
        setStudents(response.data)
    }

    fetchStudents()
   }, [])

    return <div className="p-32 space-y-4">
        <h1>Students List</h1>
        <p>
            NOM: {name}
        </p>
        <ul>
            {students.map((student, index) => {
                return <li key={index}>{student.name}</li>
            })}
        </ul>
        <Input value={name} onChange={onNameChange} placeholder="nom"/>
        <Button onClick={saveStudent}>Envoyer</Button>
    </div>
}

 */


// Cas d'un client component avec usage de react-query pour récupérer les données depuis l'API
export default function StudentsPage() {

   
    
    const {data: students} = useQuery({
        queryKey: ['students'],
        initialData: [],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/students')
            return response.data
        }
    })



    // La fonction pour supprimer un étudiant à partir de son id
    const deleteStudent = (id: number) => {

    }

    return <div className="p-32 space-y-4">
        <h1>Liste des étudiants</h1>
        <div className="flex justify-end">
            <Link href="/students/create">
                <Button>Ajouter</Button>
            </Link>
        </div>
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Nom</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {students?.map((student: any, index: number) => (
                    <tr key={index}>
                        <td className="border border-gray-300 p-2">{student.id}</td>
                        <td className="border border-gray-300 p-2">{student.name}</td>
                        <td className="border border-gray-300 p-2">
                            <div className="flex space-x-2">
                                <Link href={`/students/${student.id}`}>
                                    <Button variant="outline" size="sm">Modifier</Button>
                                </Link>
                                <Button onClick={() => deleteStudent(student.id)} variant="destructive" size="sm">Supprimer</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

