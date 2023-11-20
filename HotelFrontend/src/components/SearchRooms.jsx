import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useState } from 'react';
import Contex from '../contextApi/Contex';
import 'animate.css';
import { v4 } from 'uuid';



const SearchRooms = () => {
  
  return (
    <div className="p-2 animate__animated animate__backInDown">
      <div className="m-4 mx-auto p-4 px-20 rounded-xl bg-[#fcf2dd]  w-fit flex flex-col md:flex-row justify-center gap-10 items-center">
        <div>
          <span>Paquetes</span>
          <h3 className="text-4xl">Date un capricho</h3>
        </div>
        <RoomComponents Roomtitle={'Habitaciones'} RoomOption={['Individual', 'Doble', 'Familiar', 'Presidencial']}/>
        <RoomPrice title={'Precio por noche'}/>
        <GuestsComponenet title={'Invitados'} option={[1, 2, 3, 4]}/>
      </div>
    </div>
  );
};

export default SearchRooms;


const valuetext = value => value;

function RoomPrice({title}) {
  const { PriceRange, setPriceRange } = useContext(Contex)
  const handleChange = event => setPriceRange(event.target.value) ;
    return (
      <Box className="min-w-[8rem]">
        <label >{title}</label>
        <Slider
          value={PriceRange ? PriceRange : 0}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={1000}
          min={1000}
          max={10000}
        />
      </Box>
    );
}

function GuestsComponenet({ title, option }) {
  const {Guest, setGuest} = useContext(Contex)
  
    const handleChange = event => setGuest(event.target.value) ;
    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>{title}</InputLabel>
          <Select value={Guest} label="Guest" onChange={handleChange}>
            {option.map(item => <MenuItem key={v4()}  value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    );
}

const RoomComponents = ({ Roomtitle, RoomOption }) =>{
  const {Room, setRoom} = useContext(Contex)
  const handleChange = event => setRoom(event.target.value) ;
  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel>{Roomtitle}</InputLabel>
      <Select value={Room} label="Room" onChange={handleChange}>
        {RoomOption.map(item => <MenuItem key={v4()} value={item}>{item}</MenuItem>)}
      </Select>
    </FormControl>
  </Box>
);
}