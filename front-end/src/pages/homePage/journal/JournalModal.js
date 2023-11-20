import Dialog from "@mui/material/Dialog";
import JournalForm from './JournalForm';

const JournalModal = ({ open, handleClose, waveData,
  selectedBuoy,
  date,
   }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <JournalForm handleClose={handleClose} waveData={waveData} selectedBuoy={selectedBuoy} date={date} />
  
    </Dialog>
  );
};

export default JournalModal;