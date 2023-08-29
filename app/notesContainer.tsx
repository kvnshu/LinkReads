'use client'
import React, { useState } from "react"

export default function NotesContainer() {
    const [formData, setFormData] = useState({
        url: ""
    })

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
        const data = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        })

        // console.log(data.get('url'))

        fetch(formURL, {
            method: "POST",
            body: data,
            headers: {
                'accept': 'application/json',
            },
        }).then(() => {
            setFormData({
                url: "",
            })
        })
    }

    return (
        <div>
            <h1>Notes</h1>
            <div id="notes-view-container">
                {/* {
                    notes?.map((note) => {
                        return <Note key={note.id} note={note}/>
                    })
                } */}
            </div>
            <div id="notes-form">
                <form method="POST" action="/api/note" onSubmit={submitForm}>
                    <input type="text" name="url" onChange={handleInput} value={formData.url} placeholder="www.example.com" />
                    <button type="submit" className="bg-blue-100 rounded-full px-4">Add Note</button>
                </form>
            </div >
        </div >
    )
}
        </div>
    )
}