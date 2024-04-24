import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pagina1 from './pages/Pagina1';
import Menu from './components/Menu';
import Pagina2 from './pages/Pagina2';
import TodosLosGastos from './pages/TodosLosGastos';
import Edicion from './pages/Edicion';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagina1" element={<Pagina1 />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/todoslosgastos" element={<TodosLosGastos />} />
        <Route path="/edicion" element={<Edicion />} />
        
      </Routes>
    </BrowserRouter>
  );
}

// Create a root using createRoot from 'react-dom/client'
const root = createRoot(document.getElementById('root'));

// Render your application inside the root using the root.render method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;