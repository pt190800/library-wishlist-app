import { NavLink } from 'react-router-dom';

export function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-lg font-bold text-indigo-600">MyLibrary</span>

        <div className="flex gap-2">
          <NavLink to="/" className={linkClass} end>
            Search
          </NavLink>
          <NavLink to="/wishlist" className={linkClass}>
            My Wish List
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
