import Dialog from "@mui/material/Dialog";
import JournalForm from './JournalForm';

const JournalModal = ({ open, handleClose, currentReading,
  selectedBuoy,
  date,
   }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <JournalForm handleClose={handleClose} currentReading={currentReading} selectedBuoy={selectedBuoy} date={date} />
    </Dialog>
  );
};

export default JournalModal;