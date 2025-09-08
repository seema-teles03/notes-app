import { Note } from '../types/note'
import { Edit, Trash2 } from 'lucide-react'
import Card from './Card'
import { Button } from './Button'

export default function NoteCard({
  note,
  onEdit,
  onDelete
}: {
  note: Note
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <h2 className="font-semibold sm:text-xl  pr-4">{note.title}</h2>

        <div className="flex text-gray-500">
          <Button
            variant="ghost"
            onClick={onEdit}
            className="py-2 px-2 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
            aria-label="Edit"
            title="Edit Note"
          >
            <Edit size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={onDelete}
            className="py-2 px-2 rounded-full hover:bg-red-50 text-red-600 transition-colors"
            aria-label="Delete"
            title="Delete Note"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">{note.content}</p>
    </Card>
  )
}