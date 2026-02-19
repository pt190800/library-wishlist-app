import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WishListProvider } from '../context/WishListContext';
import { SearchPage } from '../pages/SearchPage';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ totalItems: 0, items: [] }),
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const renderSearchPage = () =>
  render(
    <MemoryRouter>
      <WishListProvider>
        <SearchPage />
      </WishListProvider>
    </MemoryRouter>
  );

describe('SearchPage', () => {
  it('renders the search heading', () => {
    renderSearchPage();
    expect(screen.getByText('Search Books')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    renderSearchPage();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('does not show results or errors on initial render', () => {
    renderSearchPage();
    expect(screen.queryByText(/API error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/No books found/i)).not.toBeInTheDocument();
  });
});
