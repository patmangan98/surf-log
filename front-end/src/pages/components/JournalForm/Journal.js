import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import JournalModal from "./JournalModal"
import { useState } from "react";

export default function Journal(props) {
 
  // const {  } = props

  const [open, setOpen] = useState(false)
 
  // Review modal dialog open
  const handleOpen = () => {
    setOpen(true)
  };

  // Review modal dialog close
  const handleClose = () => {
    setOpen(false)
    // window.location.reload()
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
        Record a Journal Entry
      </Button>
      <JournalModal open={open} handleClose={handleClose} />
    
    </>
  );
}
