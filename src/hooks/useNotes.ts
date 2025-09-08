import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '../types/note';
import * as api from '../api/notes';
import { nextTempId } from '../utils/id';

const NOTES_KEY = ['notes'];

export function useNotes(page: number, limit: number) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: [...NOTES_KEY, page],
    queryFn: () => api.fetchNotes(page, limit),
    staleTime: 1000 * 60,
    keepPreviousData: true, // smooth pagination
    retry: 1
  });

  const create = useMutation(api.createNote, {
    onMutate: async (newNote) => {
      await qc.cancelQueries({ queryKey: NOTES_KEY });
      const prev = qc.getQueryData<Note[]>(NOTES_KEY) || [];
      const optim = { id: nextTempId(), ...newNote };
      qc.setQueryData(NOTES_KEY, [optim, ...prev]);
      return { prev };
    },
    onError: (_err, _newNote, context: any) => {
      if (context?.prev) qc.setQueryData(NOTES_KEY, context.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: NOTES_KEY })
  });

  const update = useMutation(api.updateNote, {
    onMutate: async (note) => {
      await qc.cancelQueries({ queryKey: NOTES_KEY });
      const prev = qc.getQueryData<Note[]>(NOTES_KEY) || [];
      qc.setQueryData(NOTES_KEY, prev.map(n => n.id === note.id ? note : n));
      return { prev };
    },
    onError: (_err, _note, context: any) => {
      if (context?.prev) qc.setQueryData(NOTES_KEY, context.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: NOTES_KEY })
  });

  const remove = useMutation(api.deleteNoteApi, {
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: NOTES_KEY });
      const prev = qc.getQueryData<Note[]>(NOTES_KEY) || [];
      qc.setQueryData(NOTES_KEY, prev.filter(n => n.id !== id));
      return { prev };
    },
    onError: (_err, _id, context: any) => {
      if (context?.prev) qc.setQueryData(NOTES_KEY, context.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: NOTES_KEY })
  });

  return {
    ...query,
    create,
    update,
    remove
  };
}
