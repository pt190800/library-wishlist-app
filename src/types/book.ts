// ── Internal app type ──

export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail?: string;
  description?: string;
}

// ── Google Books API response types (minimal) ──

export interface GoogleVolumeItem {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleVolumeItem[];
}

// ── Mapper ──

export function mapVolumeToBook(item: GoogleVolumeItem): Book {
  return {
    id: item.id,
    title: item.volumeInfo.title ?? 'Unknown Title',
    authors: item.volumeInfo.authors ?? ['Unknown Author'],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail,
    description: item.volumeInfo.description,
  };
}
