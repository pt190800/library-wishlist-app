import { useEffect, useReducer } from 'react';
import type { Book, GoogleBooksResponse } from '../types/book';
import { mapVolumeToBook } from '../types/book';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

// ── State & Actions ──

interface State {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalItems: number;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; books: Book[]; totalItems: number }
  | { type: 'FETCH_ERROR'; error: string };

const initialState: State = {
  books: [],
  loading: false,
  error: null,
  totalItems: 0,
};

function reducer(_state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...initialState, loading: true };
    case 'FETCH_SUCCESS':
      return { books: action.books, loading: false, error: null, totalItems: action.totalItems };
    case 'FETCH_ERROR':
      return { books: [], loading: false, error: action.error, totalItems: 0 };
  }
}

// ── Hook ──

export interface UseBookSearchResult {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalItems: number;
}

export function useBookSearch(query: string): UseBookSearchResult {
  const [state, dispatch] = useReducer(reducer, initialState);

  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed) return;

    const controller = new AbortController();
    dispatch({ type: 'FETCH_START' });

    fetch(`${API_URL}?q=${encodeURIComponent(trimmed)}&maxResults=20`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json() as Promise<GoogleBooksResponse>;
      })
      .then((data) => {
        dispatch({
          type: 'FETCH_SUCCESS',
          books: data.items ? data.items.map(mapVolumeToBook) : [],
          totalItems: data.totalItems,
        });
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        dispatch({
          type: 'FETCH_ERROR',
          error: err instanceof Error ? err.message : 'An unexpected error occurred',
        });
      });

    return () => controller.abort();
  }, [trimmed]);

  if (!trimmed) {
    return initialState;
  }

  return state;
}
