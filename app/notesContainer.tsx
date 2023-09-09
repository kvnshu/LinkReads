import CreateNote from './createNote'

export default async function NotesContainer() {
    const notes = await getNotes()

    return (
        <div>
            <h1>Notes</h1>
            <CreateNote />
            <div id="notes-view-container">
                {
                    notes?.map((note) => {
                        return <Note key={note.id} note={note} />
                    })
                }
            </div>
        </div >
    )
}

async function getNotes() {
    const res = await fetch("localhost://3000/api/note", {
        cache: 'no-store'
    })

    const data = await res.json()
    return data as any[]
}

function Note({ note }: any) {
    const { note_url } = note || {};
    return (
        <div>
            <p>{note_url}</p>
        </div>
    )
}