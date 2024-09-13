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
    <div className="sticky top-0 p-2 z-10 flex w-screen bg-slate-950 items-center  justify-between  gap-4">
    
    <div className="text-3xl logo-font tracking-wider px- font-bold bg-gradient-to-r  text-transparent bg-clip-text from-gray-700  to-purple-500  ">OneVote</div>

        <div className="a flex gap-4  p-3">
    <div onClick={() =>handleClick('/analytics')} className={`bg-transparent pb-1 ${active=="/analytics" &&" text-purple-500/80 border-b-2 border-purple-700"  } px-3 rounded-md cursor-pointer   focus:outline-none    flex items-center gap-3`}>
    <span>Analytics</span>
    
    <img src={analyticsIcon} className="w-6 invert h-6 bg-red-60 " alt="" />
    
    </div>

    <div onClick={() =>handleClick('/')} className={`bg-transparent pb-1 ${active=="/" &&" text-purple-500/80 border-b-2 border-purple-700"  } px-3 rounded-md cursor-pointer   focus:outline-none    flex items-center gap-3`}>
    <span>Cast Vote</span>
    
    <img src={voteIcon} className="w-6 invert h-6 bg-red-60 " alt="" />
    
    </div>
        </div>
    </div>
  )
}

export default Navbar