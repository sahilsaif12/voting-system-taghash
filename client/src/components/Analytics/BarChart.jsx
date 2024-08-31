import React from 'react'
import { Bar } from 'react-chartjs-2'

function BarChart({chartData}) {
  return (
    <div className=" w-1/3">
    <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Total number of votes casted till now",
              color:"wheat",
            },
            legend: {
              display: false
            }
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

        drawOnChartArea:false,
        color: '#7171716b',
    },
},
x:{
    border: {
        color: '#E8E8E8'
    },
    ticks: {
        color: '#CECFCF',
    },
    grid: {
        drawOnChartArea:false,
        color: "#7171716b"
    }
},
          }
        }}
        />
    </div>
  )
}

export default BarChart