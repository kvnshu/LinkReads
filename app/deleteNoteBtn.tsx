'use client'

import { useRouter } from "next/navigation";

export default function DeleteNoteBtn({ note_id }: any) {
    const router = useRouter();

    const deleteNote = async () => {
        const res = await fetch("/api/note", {
            method: "DELETE",
            body: JSON.stringify({
                note_id: note_id
            }),
            headers: {
                'accept': 'application/json',
            },
        })
        
        if (res.ok) {
            router.refresh();
        }
    }
    return (
        <button onClick={deleteNote}>
            Delete
        </button>
    )
}


