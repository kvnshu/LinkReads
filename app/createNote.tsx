'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function CreateNote() {
    const [formData, setFormData] = useState({
        note_url: ""
    })

    const router = useRouter()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    }

    const submitForm = (e: React.FormEvent): void => {
        e.preventDefault()

        const formURL = (e.target as HTMLFormElement).action 

        fetch(formURL, {
            method: "POST",
            body: JSON.stringify({
                note_url: formData.note_url
            }),
            headers: {
                'accept': 'application/json',
            },
        }).then(() => {
            setFormData({
                note_url: "",
            })
            
            router.refresh()
        })
    }

    return (
        <div >
            <form method="POST" action="/api/note" onSubmit={submitForm}>
                <input
                    type="text"
                    name="note_url"
                    onChange={handleInput}
                    value={formData.note_url}
                    placeholder="www.example.com"
                />
                <button type="submit" className="bg-blue-100 rounded-full px-4">
                    Add Note
                </button>
            </form>
        </div >
    )
}