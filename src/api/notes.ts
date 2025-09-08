import axios from 'axios';
import { Note } from '../types/note';

const api = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchNotes = async (page = 1, limit = 6): Promise<{ data: Note[]; total: number }> => {
  const res = await api.get('/notes', {
    params: { _page: page, _limit: limit }
  });

  const total = parseInt(res.headers['x-total-count'] || '0', 10);

  return { data: res.data, total };
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const res = await api.post('/notes', note);
  return res.data;
};

export const updateNote = async (note: Note): Promise<Note> => {
  const res = await api.put(`/notes/${note.id}`, note);
  return res.data;
};

export const deleteNoteApi = async (id: number) => {
  await api.delete(`/notes/${id}`);
};
