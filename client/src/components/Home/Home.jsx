import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import  vote2 from '../../assets/vote2.png'
function Home({data,setReload}) {
    const [date, setdate] = useState(null);
    const [name, setname] = useState("")
    const [vote, setvote] = useState(null)
    const [disable, setdisable] = useState(true)
    const [loading, setloading] = useState(false)
    const [btnText, setbtnText] = useState('Save')
    const toast = useRef(null);

    const handleChange=(e,setvalue) => {
        setvalue(e.target.value)
    
    }

    useEffect(() => {
      if (name!=="" && vote!==null && date!==null ) {
        setdisable(false)
        
      }
    }, [name,vote,date])
    
    const handleSave=async() => {
        
        setbtnText('Saving ')
        setloading(true)
        
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/voters`, {
                name,voting_choice:vote,casted_at:new Date(date).toISOString()
            })
            if (res.data.success) {
                setbtnText('Saved')
                setloading(false)
                showMessage()
            }
        } catch (error) {
            console.log(error);
            
        }

        setTimeout(() => {
            setname('')
                setvote(null)
                setdate(null)
            setbtnText('Save')
            setdisable(true)
        }, 1500);

    }

    const showMessage = () => {

        toast.current.show({ severity: 'success', summary: 'Vote casted', detail: name+ ', Your vote is confirmed', life: 2000});
    };
  

   
    return (

        <div className="flex  flex-col-reverse md:flex-row w-full p-3  items-center justify-center gap-3">

        <div className="p-2  w-1/5">
            <img src={vote2} className="  " alt="" />
        </div>
        <div class="container    b my-5 md:w-2/5   rounded-lg border-2 border-gray-700 shadow-lg bg-slate-900">
<Toast ref={toast}  position="bottom-center" />

            <div class="m-5 rounded-2xl py-4 border border-gray-800/90 bg-gray-950/40 shadow-inner space-y-5 ">
                <h4 class="text-center text-gray-300 font-serif  text-2xl">Cast your vote</h4>

                <div>
                    <div class="flex flex-col  px-10 gap-5">
                    <span className='text-left  text-gray-300/90'>Name</span>
                        <input
                            type="text"
                            name='name'
                            class="border bg-slate-900 rounded-md -m-2  border-gray-600 px-4 py-2 focus:outline-none focus:border-gray-700"
                            placeholder=" Your name"
                            value={name}
                            onChange={(e)=>handleChange(e,setname)}
                        />


<div className='text-left  mt-2 text-gray-300/90'>Vote</div>
<div className="mb-3 flex gap-4 ">

                                    <label onClick={() => setvote('yes')} for="yes" class="block cursor-pointer mb-2 text-sm font-medium text-gray-400">Yes</label>
                                    <input onClick={() => setvote('yes')} checked={vote=='yes'} type="radio" id='yes' name="radio-2" className="radio bg-transparent  cursor-pointer radio-success" />
                                    <label onClick={() => setvote('no')} for="no" class="block mb-2 cursor-pointer text-sm font-medium text-gray-400">No</label>
                                    <input onClick={() => setvote('no')} checked={vote=='no'} type="radio" id='no' name="radio-2" className="radio  bg-transparent  cursor-pointer radio-error" />
                                </div>
                        
                        <div className="text-left text-gray-300 p- pb-0 ">
                            Pick Date
                        </div>
                <Calendar id="buttondisplay"   value={date} onChange={(e) => setdate(e.value)} 
                inputClassName=' h-10 p-2 shadow-lg' dateFormat='dd-mm-yy'  showButtonBar clearButtonClassName='bg-red-950/60 p-2 px-3 rounded-md' panelClassName='bg-gray-900 '  todayButtonClassName='bg-cyan-900 p-2 px-3 rounded-md' />
                         
                    </div>
                    <div className="flex justify-center">
                    <button
                        // type="submit"
                        disabled={disable}
                        onClick={handleSave}
                        class="focus:outline-none w-2/5 rounded-md mt-5 disabled:bg-purple-700/40 disabled:cursor-not-allowed disabled:text-gray-300 bg-purple-700 px-4 py-2 text-white font-semibold "
                    >{
                        loading ? 
                        <div className="flex justify-center gap-2">{btnText}   <span className="loading loading-infinity loading-md"></span> </div>
                        : btnText
                    }</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Home