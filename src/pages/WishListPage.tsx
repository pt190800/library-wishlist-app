import { useState } from 'react';
import { BookCard } from '../components/BookCard';
import { BookDetailModal } from '../components/BookDetailModal';
import { useWishList } from '../context/WishListContext';
import type { Book } from '../types/book';

export function WishListPage() {
  const { wishList, removeBook } = useWishList();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        My Wish List
      </h1>

      {wishList.length === 0 ? (
        <div className="text-center py-16">
          <span className="block text-5xl mb-4">📚</span>
          <p className="text-gray-500 text-lg">
            Your wish list is empty. Search for books and add them here!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishList.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClickDetail={() => setSelectedBook(book)}
              actionButton={
                <button
                  onClick={() => removeBook(book.id)}
                  className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  Remove
                </button>
              }
            />
          ))}
        </div>
      )}

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
