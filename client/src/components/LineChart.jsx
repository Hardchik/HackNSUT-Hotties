import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';
// import io from "socket.io-client"
import { socket } from '../App';

ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function LineChart({ appliance }) {
  const [chartData, setChartData] = useState([]);
  const [chartColor, setChartColor] = useState('#60a5fa6e');

  useEffect(() => {
    socket.emit("dashboard", appliance, appliance.length % 2);
    
    socket.on("dashboard-data", (file, point) => {
      if (!file.includes(appliance.toLowerCase())) return;
      setChartData(prev => [...prev, point].slice(-10))
    })
  }, [])

  useEffect(() => {
    const mean = chartData.reduce((a, b) => a + b, 0) / chartData.length;
    if (chartData[chartData.length - 1] > 5) setChartColor('#ff000075');
    else setChartColor('#60a5fa6e');
  }, [chartData])

  return (
    <>
      <Line data={{
        labels: ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
        datasets: [
          {
            label: appliance,
            data: chartData,
            backgroundColor: chartColor,
            borderColor: chartColor.slice(0, -2),
            tension: 0.4,
            fill: true,
            pointStyle: 'circle',
            pointBackgroundColor: '#fff',
            showLine: true
          }
        ]
      }} options={{
        plugins: {
          legend: {
            display: false
          }
        }
      }}></Line>
    </>
  )
}

export default LineChart