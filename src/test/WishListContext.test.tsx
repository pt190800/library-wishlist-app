import { renderHook, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { WishListProvider, useWishList } from '../context/WishListContext';
import type { Book } from '../types/book';

const wrapper = ({ children }: { children: ReactNode }) => (
  <WishListProvider>{children}</WishListProvider>
);

const mockBook: Book = {
  id: 'book-1',
  title: 'Clean Code',
  authors: ['Robert C. Martin'],
};

beforeEach(() => {
  localStorage.clear();
});

describe('WishListContext', () => {
  it('starts with an empty wish list', () => {
    const { result } = renderHook(() => useWishList(), { wrapper });
    expect(result.current.wishList).toHaveLength(0);
  });

  it('adds a book to the wish list', () => {
    const { result } = renderHook(() => useWishList(), { wrapper });

    act(() => { result.current.addBook(mockBook); });

    expect(result.current.wishList).toHaveLength(1);
    expect(result.current.wishList[0].id).toBe('book-1');
  });

  it('does not add duplicate books', () => {
    const { result } = renderHook(() => useWishList(), { wrapper });

    act(() => {
      result.current.addBook(mockBook);
      result.current.addBook(mockBook);
    });

    expect(result.current.wishList).toHaveLength(1);
  });

  it('removes a book from the wish list', () => {
    const { result } = renderHook(() => useWishList(), { wrapper });

    act(() => { result.current.addBook(mockBook); });
    act(() => { result.current.removeBook('book-1'); });

    expect(result.current.wishList).toHaveLength(0);
  });

  it('isInWishList returns true for added books', () => {
    const { result } = renderHook(() => useWishList(), { wrapper });

    act(() => { result.current.addBook(mockBook); });

    expect(result.current.isInWishList('book-1')).toBe(true);
    expect(result.current.isInWishList('book-999')).toBe(false);
  });

  it('persists the wish list to localStorage', () => {
    const { result } = renderHook(() => useWishList(), { wrapper });

    act(() => { result.current.addBook(mockBook); });

    const stored = JSON.parse(localStorage.getItem('wishlist') ?? '[]') as Book[];
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe('book-1');
  });
});
