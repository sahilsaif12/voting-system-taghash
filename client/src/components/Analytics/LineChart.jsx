import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Data } from '../../utils/data';
import axios from 'axios';
import moment from 'moment';

function LineChart() {
    const [data, setdata] = useState([])
    const chartData={
        labels: data?.map((d) => moment(d.casted_at).format('DD-MM-YYYY')), 
        datasets: [
          {
            label: "Yes ",
            data:data?.map((d) => d.yesCnt),
            backgroundColor: [
          '#48A4FF',
        ],
            borderColor: "#48A4FF",
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
                const res = await axios.get(`${import.meta.env.VITE_SERVER}/voters/dateWiseVote`)
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
        <div className=" w-2/5   h flex justify-center  rounded">

            <Line
                data={chartData}
                options={{
                    
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: "Number of vote casted on every dates",
                            color: "wheat"
                        },
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