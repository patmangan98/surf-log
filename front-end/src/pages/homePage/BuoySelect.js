import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function BuoySelect({ onChange, value }) {
 
  const handleChange = (event) => {
    onChange(event.target.value)
  }
  
  return (
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Choose a Location/Buoy"
    onChange={handleChange}
  >
    <MenuItem value={"44008"}>
      NorthEast / Nantucket (40.496 N 69.250 W )
    </MenuItem>
    <MenuItem value={"44084"}>
      Mid-Atlantic / Bethany Beach DE (38.537 N 75.044 W)
    </MenuItem>
    <MenuItem value={"41002"}>
      North Carolina / South Hatteras (31.759 N 74.936 W)
    </MenuItem>
    <MenuItem value={"41013"}>
      Southern North Carolina / Frying Pan Shoals (33.441 N 77.764 W)
    </MenuItem>
    <MenuItem value={"41110"}>
      Southern North Carolina / Masonboro Inlet (33.441 N 77.764 W)
    </MenuItem>
    <MenuItem value={"41004"}>
      Southern South Carolina / Edisto (32.502 N 79.099 W)
    </MenuItem>
    <MenuItem value={"41008"}>
      Southern South Carolina / Grays Reef (31.400 N 80.866 W )
    </MenuItem>
    <MenuItem value={"41009"}>
      Northern Florida / East Canaveral{" "}
    </MenuItem>
    <MenuItem value={"41114"}>
      Southern Florida / Fort Pierce (27.552 N 80.216 W)
    </MenuItem>
    <MenuItem value={"41047"}>
      Bahamas / Northeast Bahama (27.465 N 71.452 W)
    </MenuItem>
    <MenuItem value={"41046"}>
      Bahamas / East Bahama (23.822 N 68.393 W)
    </MenuItem>
  </Select>
  )
}

export default BuoySelect