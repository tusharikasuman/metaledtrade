import React from 'react'
import About from './Pages/About.jsx'
import Footer from './Components/Footer.jsx'

function App() {
  return (
    <div className="relative min-h-screen bg-[#131313] text-on-surface font-body-md antialiased overflow-x-hidden flex flex-col justify-between">
      <main className="flex-grow">
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App