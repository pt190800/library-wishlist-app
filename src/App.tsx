import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WishListProvider } from './context/WishListContext';
import { Navbar } from './components/Navbar';
import { SearchPage } from './pages/SearchPage';
import { WishListPage } from './pages/WishListPage';

export default function App() {
  return (
    <BrowserRouter>
      <WishListProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
          </Routes>
        </div>
      </WishListProvider>
    </BrowserRouter>
  );
}
