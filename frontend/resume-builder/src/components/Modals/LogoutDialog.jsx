import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { purple, red } from '@mui/material/colors';

function LogoutDialog({ open, onClose, handler }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight="700">Logout</DialogTitle>
      <DialogContent>
        <DialogContentText fontSize="1.1rem">
          Are you sure want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: purple[500],
            borderColor: purple[500],
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handler}
          variant="contained"
          sx={{
            bgcolor: red[600],
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;
