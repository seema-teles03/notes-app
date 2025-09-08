import { Search } from 'lucide-react'
import { Input } from './Input'

export default function SearchBar({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void
}) {
  return (
    <div className="relative w-full max-w-md">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
        <Search className="w-4 h-4" />
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Notes"
        className="w-full pl-10 pr-4"
        aria-label="Search notes"
      />
    </div>
  )
}