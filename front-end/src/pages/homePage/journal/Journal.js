import Button from "@mui/material/Button"
import JournalModal from "./JournalModal"
import { useState } from "react"
import { getCurrentDate } from "../../../utility"

export default function Journal(props) {
  // prop "date" is the value passed in from the calendar, it may be a past date!
  // prop "date" is an object and must be formatted
  // utility function getCurrentDate gets the current date in the proper format

  const { currentReading, selectedBuoy, date } = props

  let buttonText = "Write a surf journal record for "

  if (date.format("MM-DD-YYYY") === getCurrentDate()) {
    buttonText = buttonText + "today " + getCurrentDate()
  } else {
    buttonText = buttonText + "prior day " + date.format("MM-DD-YYYY")
  }

  const [open, setOpen] = useState(false)

  // Journal modal dialog open
  const handleOpen = () => {
    setOpen(true)
  }

  // Journal modal dialog close
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        className="button"
        variant="contained"
        sx={{ marginTop: "10px", width: "325px" }}
        onClick={handleOpen}
        target="_blank"
      >
        {buttonText}
      </Button>
      <JournalModal
        open={open}
        handleClose={handleClose}
        currentReading={currentReading}
        selectedBuoy={selectedBuoy}
        date={date}
      />
      <br></br>
      <br></br>
    </>
  )
}
