import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Students from './pages/Students'
import Header from './components/Header'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => setPath(window.location.pathname))
  return (
    <BrowserRouter>
      <Header.root>
        <div className="flex justify-between ml-[-1rem] w-1/6 items-center">
          <a href="https://cotuca.unicamp.br"><img src="/cotuca.png" className="h-10" alt="logo cotuca" /></a>
          { path != "/" && <Header.button path="/" text="home" /> }
        </div>
        <div className="w-1/3 flex justify-between items-center">
          <Header.button path="/student" text="aluno" />
          <Header.button path="/courses" text="curso" />
          <Header.button path="/carometer" text="carômetro" />
        </div>
      </Header.root>
      <main className="px-12 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Students />} />
          <Route path="/carometer" element={<Students />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
