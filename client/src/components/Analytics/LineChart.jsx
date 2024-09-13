import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Data } from '../../utils/data';
import axios from 'axios';
import moment from 'moment';

function LineChart() {
    const [data, setdata] = useState([])
    const chartData={
        labels: data?.map((d) => moment(d.casted_at).format('ll')), 
        datasets: [
          {
            label: "Yes ",
            data:data?.map((d) => d.yesCnt),
            backgroundColor: [
        //   '#48A4FF',
          'lightgreen'
        ],
            borderColor: "lightgreen",
            borderWidth: 4,
            tension: 0.3,
            pointStyle: 'circle',
      pointRadius: 6,
      pointHoverRadius: 10
            
          },
          {
            label: "No ",
            data:data?.map((d) => d.noCnt),
backgroundColor: [
          'pink',
        ],            borderColor: "pink",
            borderWidth: 4,
            tension: 0.3,
            pointStyle: 'circle',
      pointRadius: 6,
      pointHoverRadius: 10

            
          }
        ]
      }


      useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/voters/dateWiseVote`)
                if (res.data.success) {
                    setdata(res.data.data)
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        getData()
      }, [])
      
      
    return (
        <div className=" w-3/5 my-2 h flex flex-col justify-center  rounded">
        <div className="">

<div className="text-lg text-left text-gray-200 mb-4 font-semibold">Trends of both vote over the time</div>
<div className="text-sm text-gray-400 mb-3"> ↪ This line graph illustrating two distinct trends: one for "Yes" votes and the other for "No" votes, showing the daily count of each vote type over time.</div>

</div>
            <Line
                data={chartData}
                options={{
                    
                    responsive: true,
                    plugins: {
                        
                        legend: {
                            display: true
                        },

                    },
                    scales: {

                        y: {
                            border: {
                                color: '#E8E8E8'
                            },
                            ticks: {
                                color: '#CECFCF',
                            },

                            grid: {

                                // drawOnChartArea:false,
                                color: '#7171716b',
                            },
                        },
                        x:

                        {
                            border: {
                                color: '#E8E8E8'
                            },
                            ticks: {
                                color: '#CECFCF',
                            },
                            grid: {
                                // drawOnChartArea:false,
                                color: "#7171716b"
                            }
                        }

                    }
                }}
            />
        </div>
    )
}

export default LineChart