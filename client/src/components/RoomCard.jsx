import React from 'react'
import { useNavigate } from 'react-router-dom'

const RoomCard = ({ name, appliances, src }) => {

	const navigate = useNavigate();

	function handleClick() {
		navigate(`/${name}`);
	}

	return (
		<div className='h-[400px] shadow-lg rounded-lg overflow-hidden relative'>
			<header className='absolute bg-black opacity-60 text-white left-0 right-0 py-3 text-lg'>{name}</header>
			<img src={src} className="object-cover h-3/4 w-full" />
			<div className='p-4 text-left flex justify-between'>
				<div>
					<span className='font-bold text-xl'>Appliances:</span>
					<p className='text-lg'>{appliances.join(", ")}</p>
				</div>
				<button className='bg-gradient-to-r from-blue-400 to-green-400 text-white font-bold'
				onClick={handleClick}>
					Go To {name}
				</button>
			</div>
		</div>
	)
}

export default RoomCard