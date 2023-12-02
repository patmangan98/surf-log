import Button from "@mui/material/Button"
import  Dialog  from '@mui/material/Dialog'
import  DialogTitle  from '@mui/material/DialogTitle'
import  DialogContent  from '@mui/material/DialogContent'
import  DialogActions  from '@mui/material/DialogActions'
import JournalModal from "./JournalModal"
import { useState } from "react"
import { getCurrentDate } from "../../../utility"

export default function Journal(props) {
  // prop "date" is the value passed in from the calendar, it may be a past date!
  // prop "date" is an object and must be formatted
  // utility function getCurrentDate gets the current date in the proper format

  const { waveData, selectedBuoy, date } = props

  let buttonText = "Write a surf journal record for "

  if (date.format("MM-DD-YYYY") === getCurrentDate()) {
    buttonText = buttonText + "today " + getCurrentDate()
  } else {
    buttonText = buttonText + "prior day " + date.format("MM-DD-YYYY")
  }
  //State for the Journal modal dialog
  const [open, setOpen] = useState(false)
  //State for the successful form submission dialog
  const [modalOpen, setModalOpen] = useState(false)

  // Journal modal dialog open
  const handleOpen = () => {
    setOpen(true)
  }

  // Journal modal dialog close
  const handleClose = () => {
    setOpen(false)
    setModalOpen(true)
  }

  //Successful form submission close
  const handleSuccessfulClose = () => {
    setModalOpen(false)
  }

  const PostSubmissionModal = ({ open, handleClose }) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thank You!</DialogTitle>
        <DialogContent>
          <p>Your post has been submitted successfully.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessfulClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
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
        waveData={waveData}
        selectedBuoy={selectedBuoy}
        date={date}
      />
      <br></br>
      <br></br>
      <PostSubmissionModal open={modalOpen} handleClose={handleClose} />
    </>
  )
}
