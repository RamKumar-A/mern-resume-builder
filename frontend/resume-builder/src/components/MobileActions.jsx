import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useState } from 'react';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { LuDownload, LuPalette, LuTrash2 } from 'react-icons/lu';
import DeleteDialog from './Modals/DeleteDialog';

function MobileActions({
  setOpenPreviewModal,
  setOpenThemeSelector,
  handleDeleteResume,
  openDeleteDialog,
  setOpenDeleteDialog,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div>
      <IconButton
        size="small"
        sx={{
          display: { sm: 'none' },
        }}
        onClick={(e) => {
          return setAnchorEl(e.currentTarget);
        }}
      >
        <HiEllipsisVertical />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem divider>
          <Button
            onClick={() => {
              setOpenThemeSelector(true);
              handleClose();
            }}
            size="small"
            sx={{
              textTransform: 'capitalize',
              color: purple[500],
            }}
            startIcon={<LuPalette style={{ fontSize: '1rem' }} />}
            variant="outlined"
          >
            <Typography variant="span">Change Theme</Typography>
          </Button>
        </MenuItem>
        <MenuItem divider>
          <Button
            onClick={() => {
              setOpenDeleteDialog(true);
              handleClose();
            }}
            size="small"
            sx={{
              textTransform: 'capitalize',
              color: purple[500],
            }}
            startIcon={<LuTrash2 style={{ fontSize: '1rem' }} />}
            variant="outlined"
          >
            <Typography variant="span">Delete</Typography>
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={() => {
              setOpenPreviewModal(true);
              handleClose();
            }}
            size="small"
            sx={{
              textTransform: 'capitalize',
              color: purple[500],
            }}
            startIcon={<LuDownload style={{ fontSize: '1rem' }} />}
            variant="outlined"
          >
            <Typography variant="span"> Preview & Download</Typography>
          </Button>
        </MenuItem>
      </Menu>
      <DeleteDialog
        handler={handleDeleteResume}
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
}

export default MobileActions;
