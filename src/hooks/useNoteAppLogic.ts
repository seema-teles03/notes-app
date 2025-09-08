import { useState, useMemo, useEffect } from 'react';
import { useNotes } from './useNotes';
import { Note } from '../types/note';

const PAGE_LIMIT = 6;

export function useNoteAppLogic() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, create, update, remove } = useNotes(page, PAGE_LIMIT);

  const [editing, setEditing] = useState<Note | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const notes = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_LIMIT);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [notes, query]);

  const errorMessage = error instanceof Error ? error.message : error ? 'An unexpected error occurred' : null;

  const handleSave = (payload: { title: string; content: string }) => {
    if (editing) {
      update.mutate({ ...editing, ...payload });
    } else {
      create.mutate(payload);
    }
    setOpen(false);
  };

  const handleEdit = (note: Note | null) => {
    setEditing(note);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    remove.mutate(id, {
      onSuccess: () => {
        if (notes.length === 1 && page > 1) {
          setPage(page - 1);
        }
      },
    });
  };

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  return {
    // State
    page,
    setPage,
    isOpen,
    setOpen,
    query,
    setQuery,
    editing,

    // Data and Status
    notes: filtered,
    total,
    totalPages,
    isLoading,
    errorMessage,

    // Functions
    handleSave,
    handleEdit,
    handleDelete,
  };
}
