import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { BookCard } from '../components/BookCard';
import { BookDetailModal } from '../components/BookDetailModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useDebounce } from '../hooks/useDebounce';
import { useBookSearch } from '../hooks/useBookSearch';
import { useWishList } from '../context/WishListContext';
import type { Book } from '../types/book';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const { books, loading, error } = useBookSearch(debouncedQuery);
  const { addBook, isInWishList } = useWishList();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Search Books
      </h1>

      <SearchBar value={query} onChange={setQuery} />

      <div className="mt-8">
        {loading && <LoadingSpinner />}

        {error && (
          <p className="text-center text-red-500 py-8">{error}</p>
        )}

        {!loading && !error && debouncedQuery.trim() && books.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No books found for "{debouncedQuery}".
          </p>
        )}

        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => {
              const inList = isInWishList(book.id);
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  onClickDetail={() => setSelectedBook(book)}
                  actionButton={
                    <button
                      onClick={() => addBook(book)}
                      disabled={inList}
                      className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        inList
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {inList ? 'Already in Wish List' : 'Add to Wish List'}
                    </button>
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
