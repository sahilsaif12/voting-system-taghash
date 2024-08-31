import React, { useEffect, useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Data } from '../../utils/data';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import axios from 'axios';

Chart.register(CategoryScale);
function Analytics() {
  const [data, setdata] = useState([])
  
  let chartData={
    labels: ['Yes', 'No'], 
    datasets: [
      {
        label: "vote casted ",
        data:data,
        // data:[12,31],
        backgroundColor: [
          'lightgreen',
          'pink',
        ],
        borderColor: "gray",
        borderWidth: 2,
        tension: 0.3,
        borderRadius:7
        
      },
      
    ]
  }

  useEffect(() => {
    async function getData() {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/voters/voteCount`)
            
            if (res.data.success) {
              let d=res.data.data
              
              let arr=[]
              arr.push(d.total_yes )
              arr.push(d.total_no )
              setdata(arr)
              console.log(arr);
              
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    getData()
  }, [])
  
  return (
    <div className='flex flex-col   gap-y-4 w-full items-center'>



      <LineChart />
      <div className="flex w-full mt-5  items-center justify-center">

      <BarChart chartData={chartData}/>
      <PieChart chartData={chartData}/>
      </div>

    </div>
  )
}

export default Analytics