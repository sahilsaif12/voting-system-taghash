import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Analytics from './components/Analytics/Analytics'
import Home from './components/Home/Home'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
    <Navbar/>
    <div className="flex place-items-center   w-screen">

    <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/analytics' exact element={<Analytics/>} />
          </Routes>
    </div>
  </div>
  )
}

export default App
