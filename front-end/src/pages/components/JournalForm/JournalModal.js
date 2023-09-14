import Dialog from "@mui/material/Dialog";
import JournalForm from "./JournalForm"

const JournalModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <JournalForm handleClose={handleClose} />
    </Dialog>
  );
};

export default JournalModal;