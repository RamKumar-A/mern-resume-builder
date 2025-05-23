import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { red } from '@mui/material/colors';

function DeleteDialog({ open, onClose, handler }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Resume</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure want to delete this resume?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handler}
          variant="contained"
          sx={{
            bgcolor: red[600],
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
