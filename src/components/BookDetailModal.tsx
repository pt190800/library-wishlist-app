import type { Book } from '../types/book';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
}

export function BookDetailModal({ book, onClose }: BookDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800 pr-4">
              {book.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer shrink-0"
            >
              &times;
            </button>
          </div>

          <p className="text-sm text-indigo-600 font-medium mb-4">
            {book.authors.join(', ')}
          </p>

          {book.thumbnail && (
            <img
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              className="mx-auto mb-4 max-h-48 object-contain"
            />
          )}

          <p className="text-gray-600 text-sm leading-relaxed">
            {book.description ?? 'No description available for this book.'}
          </p>
        </div>
      </div>
    </div>
  );
}
