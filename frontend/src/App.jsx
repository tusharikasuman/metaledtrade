import React from 'react'
import About from './Pages/About.jsx'
import Home from './Pages/Home.jsx'
import Products from './Pages/Products.jsx'
import Projects from './Pages/Projects.jsx'
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="relative min-h-screen bg-[#131313] text-on-surface font-body-md antialiased overflow-x-hidden flex flex-col justify-between">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
    </div>
  )
}

export default App