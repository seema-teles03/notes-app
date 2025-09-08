import { Note } from '../types/note'
import NoteCard from './NoteCard'

export default function NoteList({
  notes,
  onEdit,
  onDelete
}: {
  notes: Note[]
  onEdit: (n: Note) => void
  onDelete: (id: number) => void
}) {
  if (notes.length === 0) {
    return (
      <div className="text-gray-500 italic text-center mt-10">
        No notes yet. Click <span className="font-medium">New</span> to add one.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {notes.map(n => (
        <NoteCard
          key={n.id}
          note={n}
          onEdit={() => onEdit(n)}
          onDelete={() => onDelete(n.id)}
        />
      ))}
    </div>
  )
}