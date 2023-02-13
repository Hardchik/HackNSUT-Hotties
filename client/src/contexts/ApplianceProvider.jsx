import React, { useState, createContext, useContext } from "react"

const AppliancesContext = createContext();

export function useAppliances() {
	return useContext(AppliancesContext);
}

const AppliancesProvider = ({ children }) => {
	const rooms = [
		{
			name: "Master Bedroom",
			appliances: ["TV", "Air Conditioner", "Fan", "Lights"],
			src: "master bedroom.jpg"
		},
		{
			name: "Bedroom",
			appliances: ["Fan", "Lights"],
			src: "bedroom.png"
		},
		{
			name: "Living Room",
			appliances: ["Fan", "TV", "Air Conditioner"],
			src: "living room.jpg"
		},
		{
			name: "Kitchen",
			appliances: ["Dishwasher", "Fridge"],
			src: "kitchen.jfif"
		}
	]

	const [isLoading, setIsLoading] = useState(false);

	return (
		<AppliancesContext.Provider value={{ rooms, isLoading, setIsLoading }}>
			{children}
		</AppliancesContext.Provider>
	)
}

export default AppliancesProvider