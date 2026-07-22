import React from 'react'
import About from './Pages/About.jsx'
import Home from './Pages/Home.jsx'
import Products from './Pages/Products.jsx'
import Contact from './Pages/Contact.jsx'
import Careers from './Pages/Careers.jsx'
import Projects from './Pages/Projects.jsx'
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'



function App() {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-on-surface font-body-md antialiased overflow-x-clip flex flex-col justify-between">
      <Navbar/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App