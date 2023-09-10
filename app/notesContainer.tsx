import CreateNote from './createNote'
import { headers } from 'next/headers'
import DeleteNoteBtn from './deleteNoteBtn'

export default async function NotesContainer() {
    const notes = await getNotes()
    return (
        <div>
            <h1>Notes</h1>
            <CreateNote />
            <div id="notes-view-container">
                {
                    notes?.map((note) => {
                        return <Note key={note._id} note={note} />
                    })
                }
            </div>
        </div >
    )
}

function Note({ note }: any) {
    const { url, _id } = note || {};
    return (
        <div>
            <p>URL: {url}</p>
            <DeleteNoteBtn 
                note_id={_id}
            />
        </div>
    )
}

async function getNotes() {
    const res = await fetch("http://localhost:3000/api/note", {
        cache: 'no-store',
        method: 'GET',
        headers: headers()

    })
    const data = await res.json()
    return data as any[]
}
