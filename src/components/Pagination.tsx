import { Button } from './Button'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 mt-5">
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className='rounded-md'
      >
        Prev
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-10 h-10 p-0 rounded-full ${
            p === currentPage
              ? 'bg-slate-800 text-gray-700 hover:bg-gray-100 border-slate-800 shadow-md'
              : 'bg-white border-gray-300 text-black hover:bg-white'
          }`}
        >
          {p}
        </Button>
      ))}

      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        className='rounded-md'
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}