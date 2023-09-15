import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function BuoySelect({ onChange }) {
 
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
    <MenuItem value={"data/realtime2/44008.txt"}>
      NorthEast / Nantucket (40.496 N 69.250 W )
    </MenuItem>
    <MenuItem value={"data/realtime2/44084.txt"}>
      Mid-Atlantic / Bethany Beach DE (38.537 N 75.044 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41002.txt"}>
      North Carolina / South Hatteras (31.759 N 74.936 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41013.txt"}>
      Southern North Carolina / Frying Pan Shoals (33.441 N 77.764 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41110.txt"}>
      Southern North Carolina / Masonboro Inlet (33.441 N 77.764 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41004.txt"}>
      Southern South Carolina / Edisto (32.502 N 79.099 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41008.txt"}>
      Southern South Carolina / Grays Reef (31.400 N 80.866 W )
    </MenuItem>
    <MenuItem value={"data/realtime2/41009.txt"}>
      Northern Florida / East Canaveral{" "}
    </MenuItem>
    <MenuItem value={"data/realtime2/41114.txt"}>
      Southern Florida / Fort Pierce (27.552 N 80.216 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41047.txt"}>
      Bahamas / Northeast Bahama (27.465 N 71.452 W)
    </MenuItem>
    <MenuItem value={"data/realtime2/41046.txt"}>
      Bahamas / East Bahama (23.822 N 68.393 W)
    </MenuItem>
  </Select>
  )
}

export default BuoySelect