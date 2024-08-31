import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import analyticsIcon from '../assets/analytics.png'
import voteIcon from '../assets/vote.png'

function Navbar() {

  const location = useLocation();
    const [active, setactive] = useState(location.pathname)
    const navigate=useNavigate()

    const handleClick = (val) =>{
        setactive(val)
        navigate(val)
    }
  return (
    <div>
    <div className="flex w-screen justify-end  gap-4">
        <div className="a flex gap-4  p-3">
    <button onClick={() =>handleClick('/analytics')} className={`${active=="/analytics" ?" bg-purple-800/80" : "bg-transparent " }   focus:outline-none    flex items-center gap-3`}>
    <span>Analytics</span>
    
    <img src={analyticsIcon} className="w-6 invert h-6 bg-red-60 " alt="" />
    
    </button>

    <button onClick={() =>handleClick('/')} className={`${active=="/" ?" bg-purple-800/80" : "bg-transparent " }     focus:outline-none    flex items-center gap-3`}>
    <span>Cast Vote</span>
    
    <img src={voteIcon} className="w-6 invert h-6 bg-red-60 " alt="" />
    
    </button>
        </div>
    </div>
    </div>
  )
}

export default Navbar