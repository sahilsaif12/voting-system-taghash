import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

function Table() {

    const [voters, setvoters] = useState([])
    const [page, setpage] = useState(1)
    const [totalPage, settotalPage] = useState(1)
    const [loading, setloading] = useState(false)
    const ref = useRef()

    useEffect(() => {
        async function getData(voterPerPage) {
          try {
              setloading(true)
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/voters/allVoters`,{
                    params:{page,voterPerPage}
                })
                let data=res.data
                if (data.success) {
                  setvoters(data.data.voters)
                  settotalPage(data.data.totalPage)
                  setloading(false)
                    console.log(res.data.data);
                }
            } catch (error) {
              setloading(false);
                console.log(error);
                
            }
        }
        getData(5)
      }, [page])
    

      const  handlePrev=() => {
        if (page!=1) {
            setpage(page-1)
        }
      }

      const  handleNext=() => {
        console.log(page);
        
        setpage(page+1)
      }
      
      const  handleChange=(e) => {
        let value=e.target.value
        
        if (value>totalPage || value<1) {
          ref.current.value=page
        }
        else setpage(Number(value))
        console.log(value);
        

      }

  return (
    <div className="w-full flex flex-col items-center p-3">
    <div class="flex flex-col md:w-3/5 " >
    <div className="">


    <div className="text-lg text-left text-gray-200 mb-4 font-semibold">All Details of the voters</div>
    <div className="text-sm text-gray-400 mb-3"> ↪ A well-organized voting list documenting each participant’s name, vote type (Yes/No), and the date of vote submission, ensuring a clear and accurate voting record.</div>
    </div>
  <div class="-m-1.5   rounded-md overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden">
        <table class="min-w-full divide-y border border-gray-700 table-auto divide-gray-200 dark:divide-neutral-700 bg-gray-900">
          <thead >
            <tr className='bg-gray-700/70  ' >
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium  text-gray-400 uppercase dark:text-neutral-5">Name</th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium  text-gray-500 uppercase dark:text-neutral-400">Vote</th>
              <th scope="col" class="px-6 py-3  text-xs font-medium text-center   text-gray-500 uppercase dark:text-neutral-400">Voted on</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
          {
                voters?.map((data) =>{
                    return (
            <tr class=" hover:bg-gray-950/20  transition ease-in-out">

              <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800 dark:text-neutral-200">
              {
                loading?
            <div className="skeleton rounded-md bg-slate-800/90  transition ease-in-out h-5"></div>
            :

              data.name
              }
              
               </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-neutral-200">
              {
                loading?
            <div className="skeleton rounded-md bg-slate-800/90  transition ease-in-out h-5"></div>
            :
              data.voting_choice
              }
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 dark:text-neutral-200">
              {
                loading?
            <div className="skeleton rounded-md bg-slate-800/90  transition ease-in-out h-5"></div>
            :
              moment(data.casted_at).format('ll')
              }
              </td>
             
            </tr>)
            
        })
            }

          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
   
<div class="flex items-center gap-x-1 mt-3" aria-label="Pagination">
  <button onClick={handlePrev} disabled={page==1} type="button" class="min-h-[38px] cursor-pointer min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg focus:outline-none  disabled:opacity-50 disabled:pointer-events-none text-white bg-slate-800 hover:bg-slate-800/70 hover:border-none  " aria-label="Previous">
    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"></path>
    </svg>
    <span class="sr-only">Previous</span>
  </button>
  <div class="flex items-center gap-x-1">
    <input type="text" ref={ref} value={page} onChange={handleChange} class="min-h-[38px] min-w-[38px]  w-10 bg-transparent focus:bg-red-200 flex justify-center items-center border border-gray-200 text-gray-800 text-center text-sm rounded-lg focus:outline-none  disabled:opacity-50 disabled:pointer-events-none dark:border-white/25 dark:text-white dark:focus:bg-transparent" name="" id="" />
    <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-400">of</span>
    <span class="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm dark:text-neutral-400">{totalPage}</span>
  </div>
  <button onClick={handleNext} disabled={page==totalPage}  type="button" class="min-h-[38px] cursor-pointer min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed  text-white bg-slate-800 hover:bg-slate-800/70 hover:border-none  " aria-label="Next">
    <span class="sr-only">Next</span>
    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"></path>
    </svg>
  </button>
</div>    </div>
  )
}

export default Table