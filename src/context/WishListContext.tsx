import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Book } from '../types/book';

// ── Context type ──

interface WishListContextType {
  wishList: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: string) => void;
  isInWishList: (id: string) => boolean;
}

const STORAGE_KEY = 'wishlist';

const WishListContext = createContext<WishListContextType | null>(null);

// ── Provider ──

export function WishListProvider({ children }: { children: ReactNode }) {
  const [wishList, setWishList] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishList));
  }, [wishList]);

  const addBook = (book: Book) => {
    setWishList((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeBook = (id: string) => {
    setWishList((prev) => prev.filter((b) => b.id !== id));
  };

  const isInWishList = (id: string) => {
    return wishList.some((b) => b.id === id);
  };

  return (
    <WishListContext.Provider value={{ wishList, addBook, removeBook, isInWishList }}>
      {children}
    </WishListContext.Provider>
  );
}

// ── Consumer hook ──

// eslint-disable-next-line react-refresh/only-export-components
export function useWishList(): WishListContextType {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error('useWishList must be used within a WishListProvider');
  }
  return context;
}
