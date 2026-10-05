import React from 'react'
import About from './Pages/About.jsx'
import Home from './Pages/Home.jsx'
import Products from './Pages/Products.jsx'
import Contact from './Pages/Contact.jsx'
import Projects from './Pages/Projects.jsx'
import Logistics from './Pages/Logistics.jsx'
import TradeFinance from './Pages/TradeFinance.jsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/Footer.jsx'
import Preloader from './Components/Preloader.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'



function App() {
  React.useEffect(() => {
    document.documentElement.classList.add("light");
    localStorage.setItem("theme", "light");
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-on-surface font-body-md antialiased overflow-x-clip flex flex-col justify-between">
      <ScrollToTop />
      <Preloader />
      <Navbar/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          {/* Careers page removed; send old links home */}
          <Route path="/careers" element={<Navigate to="/" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/trade-finance" element={<TradeFinance />} />
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App