import React, { useEffect, useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Data } from '../../utils/data';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import axios from 'axios';
import Table from './Table';

Chart.register(CategoryScale);
function Analytics() {
  const [data, setdata] = useState([])

  let chartData = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: "vote casted ",
        data: data,
        // data:[12,31],
        backgroundColor: [
          'lightgreen',
          'pink',
        ],
        borderColor: "gray",
        borderWidth: 2,
        tension: 0.3,
        borderRadius: 7

      },

    ]
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/voters/voteCount`)

        if (res.data.success) {
          let d = res.data.data

          let arr = []
          arr.push(d.total_yes)
          arr.push(d.total_no)
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

      <Table />

      <LineChart />

      <div className="flex flex-col mt-4 w-3/5">

        <div className="text-lg text-left text-gray-200  mb-4 font-semibold">Total votes casted till date</div>
        <div className="text-sm text-gray-400 mb-3"> ↪ The bar and pie chart providing a comprehensive overview of the total "Yes" and "No" votes accumulated to date, offering a clear visual representation of the overall voting distribution.</div>

        <div className="flex w-full mt-5  items-center justify-center">

          <BarChart chartData={chartData} />
          <PieChart chartData={chartData} />
        </div>
      </div>

    </div>
  )
}

export default Analytics