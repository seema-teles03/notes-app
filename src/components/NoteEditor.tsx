import React, { useState, useEffect } from 'react'
import { Note } from '../types/note'
import Modal from './Modal'
import { Button } from './Button'
import { Input } from './Input'

export default function NoteEditor({
  isOpen,
  note,
  onClose,
  onSave
}: {
  isOpen: boolean
  note: Note | null
  onClose: () => void
  onSave: (payload: { title: string; content: string }) => void
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note, isOpen]);

  const handleSaveClick = () => {
    onSave({
      title: title.trim() || 'Untitled',
      content: content.trim()
    });
  };

  const isSaveDisabled = !title.trim() && !content.trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full"
        aria-label="Close modal"
        title="Close"
      >
        X
      </Button>

      <h2 className="text-xl font-semibold text-gray-800">{note ? 'Edit Note' : 'New Note'}</h2>

      <div className="mt-5 flex flex-col gap-4">
        <Input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 px-4 py-2 rounded-lg h-40 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button 
          variant="secondary" 
          onClick={onClose}
          className='rounded-md'
          >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSaveClick}
          disabled={isSaveDisabled}
          className='rounded-md'
        >
           Save
        </Button>
      </div>
    </Modal>
  );
}