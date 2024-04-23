import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">
            <Link to="/">Logo</Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li><Link to="/pagina1" className="text-white">Pagina 1</Link></li>
              <li><Link to="/pagina2" className="text-white">Pagina 2</Link></li>
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/todoslosgastos" className="text-white">Todos los gastos</Link></li>
              <li><Link to="/edicion" className="text-white">Edicion</Link></li>
            </ul>
          </div>
          <div className="md:hidden">
            <button className="outline-none mobile-menu-button">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className="mobile-menu hidden md:hidden">
          <ul className="mt-4 space-y-4">
            <li><Link to="/pagina1" className="block px-4 py-2 text-white bg-gray-900 rounded">Pagina 1</Link></li>
            <li><Link to="/pagina2" className="block px-4 py-2 text-white bg-gray-900 rounded">Pagina 2</Link></li>
            <li><Link to="/" className="block px-4 py-2 text-white bg-gray-900 rounded">Home</Link></li>
            <li><Link to="/todoslosgastos" className="block px-4 py-2 text-white bg-gray-900 rounded">Todos los gastos</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Menu;
