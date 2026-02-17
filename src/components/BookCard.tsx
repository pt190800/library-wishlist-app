import type { Book } from '../types/book';
import type { ReactNode } from 'react';

interface BookCardProps {
  book: Book;
  actionButton: ReactNode;
  onClickDetail?: () => void;
}

export function BookCard({ book, actionButton, onClickDetail }: BookCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <button
        type="button"
        onClick={onClickDetail}
        className="cursor-pointer"
      >
        {book.thumbnail ? (
          <img
            src={book.thumbnail}
            alt={`Cover of ${book.title}`}
            className="w-full h-56 object-contain bg-gray-50 pt-4"
          />
        ) : (
          <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <span className="block text-4xl mb-1">📖</span>
              <span className="text-sm">No Cover</span>
            </div>
          </div>
        )}
      </button>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1 mb-4">
          {book.authors.join(', ')}
        </p>

        <div className="mt-auto">{actionButton}</div>
      </div>
    </div>
  );
}
