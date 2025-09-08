import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import SearchBar from './components/SearchBar'
import Pagination from './components/Pagination'
import { Button } from './components/Button'
import { useNoteAppLogic } from './hooks/useNoteAppLogic'

export default function App() {
  const {
    page,
    setPage,
    isOpen,
    setOpen,
    query,
    setQuery,
    editing,
    notes,
    totalPages,
    isLoading,
    errorMessage,
    handleSave,
    handleEdit,
    handleDelete
  } = useNoteAppLogic()

  return (
    <div className="bg-zinc-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-4">
        <header className="flex items-center justify-between mb-2 pt-3">
          <h1 className="sm:text-3xl">Notes</h1>
          <div className="flex gap-3 items-center">
            <SearchBar value={query} onChange={setQuery} />
            <Button
              title="Add Note"
              variant="primary"
              className="pt-1 w-10 h-10 p-0 text-3xl flex items-center justify-center rounded-full"
              onClick={() => handleEdit(null)}
            >
              +
            </Button>
          </div>
        </header>

        {isLoading && <div className="text-center py-20 text-gray-500">Loading notes...</div>}

        {errorMessage && <div className="text-red-600 text-center py-4">{errorMessage}</div>}

        <NoteList
          notes={notes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />

        <NoteEditor
          isOpen={isOpen}
          note={editing}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}