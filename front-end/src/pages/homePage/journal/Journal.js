import Button from "@mui/material/Button";
import JournalModal from "./JournalModal"
import { useState } from "react";

export default function Journal(props) {
 
  const { currentReading,
    selectedBuoy,
    date } = props

  const [open, setOpen] = useState(false)
 
  // Journal modal dialog open
  const handleOpen = () => {
    setOpen(true)
  };

  // Journal modal dialog close
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        className="button"
        variant="contained"
        sx={{ marginTop: "10px", width: "225px" }}
        onClick={handleOpen}
        target="_blank"
      >
       Write a Journal Record for your Surf Session
      </Button>
      <JournalModal open={open} handleClose={handleClose} currentReading={currentReading} selectedBuoy={selectedBuoy} date={date} />
      <br></br>
      <br></br>
      
    </>
  );
}