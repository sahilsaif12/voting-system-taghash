import React from 'react'
import { Pie } from 'react-chartjs-2'

function PieChart({chartData}) {
  return (
    <div  className="">
        <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            }
          }
        }}
      />
    </div>
  )
}

export default PieChart