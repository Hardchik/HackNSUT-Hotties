import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function Bulb() {
    const [data, setData]= useState({
        labels:["12AM","3AM", "6AM", "9AM", "12AM", "3AM", "6PM", "9PM", "12AM"],
        datasets:[
          {
            label:"BULBS",
            data:[10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58],
            // backgroundColor:'yellow',
            borderColor:'green',
            tension:0.4,
            // fill:true,
            pointStyle:'rect',
            pointBorderColor:'blue',
            pointBackgroundColor:'#fff',
            showLine:true
          }
        ]
      })
  return (
    <>
     <div className="Bulb" style={{width:'400px', height:'400px',}}>
      <Line data={data}>Hello</Line>
    </div>
    </>
  )
}

export default Bulb