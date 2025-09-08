import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteCard from '../src/components/NoteCard'
import { vi } from 'vitest'

test('renders note card and buttons', () => {
  const note = { id: 1, title: 't', content: 'c' }
  const onEdit = vi.fn() 
  const onDelete = vi.fn()
  render(<NoteCard note={note} onEdit={onEdit} onDelete={onDelete} />)

  expect(screen.getByText('t')).toBeInTheDocument()
  expect(screen.getByText('c')).toBeInTheDocument()

  fireEvent.click(screen.getByTitle('Edit Note'))
  expect(onEdit).toHaveBeenCalled()

  fireEvent.click(screen.getByTitle('Delete Note'))
  expect(onDelete).toHaveBeenCalled()
})