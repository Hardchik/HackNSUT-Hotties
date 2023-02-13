import React from 'react'
import LineChart from "./LineChart"

const ChartCard = ({ appliance }) => {
	return (
		<div className='h-[400px] shadow-lg rounded-lg overflow-hidden relative flex flex-col'>
			<header className='bg-gradient-to-r from-blue-400 to-green-400 opacity-80'>
				<h3 className='text-white text-xl py-4'>{appliance}</h3>
			</header>
			<div className='px-2 flex items-center justify-center grow'>
				<LineChart appliance={appliance} />
			</div>
		</div>
	)
}

export default ChartCard