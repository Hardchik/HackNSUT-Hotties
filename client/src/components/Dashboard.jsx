import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useAppliances } from '../contexts/ApplianceProvider';
import Room from './Room';
import RoomCard from './RoomCard';

const Dashboard = () => {
  const [currentRoom, setCurrentRoom] = useState({});
  const { rooms } = useAppliances();
  const { roomname } = useParams();

  useEffect(() => {
    for(const room of rooms)
      if (room.name === roomname)
        setCurrentRoom(room);
  }, [roomname]);

  return (
    <>
      <div className='grid grid-cols-2 gap-8'>
        {
          !roomname && rooms.map(room => <RoomCard key={room.name} {...room} />)
        }
        {
          roomname && <Room room={currentRoom} />
        }
      </div>
    </>
  )
}

export default Dashboard