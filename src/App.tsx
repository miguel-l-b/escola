/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Students from './pages/Students'
import Header from './components/Header'
import Courses from './pages/Courses'
import Carometer from './pages/Carometer'

function App() {
  return (
    <BrowserRouter>
      <Header.root>
        <div className="flex-col h-1/6 justify-around items-center sm:h-fit sm:flex-row flex mt-10 sm:mt-0 sm:w-1/6">
          <a href="https://cotuca.unicamp.br"><img src="/cotuca.png" className="h-10 w-10" alt="logo cotuca" /></a>
          <Header.button path="/" text="home" />
        </div>
        <div className="sm:w-1/3 h-1/3 flex-col justify-around items-center sm:h-fit sm:flex-row flex sm:justify-between sm:items-center">
          <Header.button path="/student" text="aluno" />
          <Header.button path="/courses" text="curso" />
          <Header.button path="/carometer" text="carômetro" />
        </div>
      </Header.root>
      <main className="px-12 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/carometer" element={<Carometer />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
