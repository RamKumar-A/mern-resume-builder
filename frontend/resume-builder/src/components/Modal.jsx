import {
  Backdrop,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import { HiXMark } from 'react-icons/hi2';

function Modal({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnText,
  actionBtnIcon,
  onActionClick,
}) {
  if (!isOpen) return null;
  return (
    <Box
      position="fixed"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      sx={{
        inset: '0',
        zIndex: '50',
        backdropFilter: 'brightness(50%)',
      }}
    >
      <Stack
        position="relative"
        bgcolor="#fff"
        borderRadius="0.5rem"
        overflow="hidden"
        px={{ xs: '0.25rem', md: '1rem', xl: '1.5rem' }}
        mx={{ xs: '0.25rem', md: '1rem', xl: '1.5rem' }}
        height="90vh"
      >
        {/* Modal Header */}
        {!hideHeader && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p="1rem"
            borderBottom={`1px solid ${blueGrey[200]}`}
          >
            <Typography
              fontSize={{ xs: '0.8rem', sm: '1.125rem' }}
              fontWeight="500"
              color={blueGrey[900]}
              // className="line-clamp-1"
            >
              {title}
            </Typography>
            {showActionBtn && (
              <Button
                onClick={() => onActionClick()}
                size="small"
                variant="outlined"
                endIcon={actionBtnIcon}
                sx={{
                  mr: '1.5rem',
                  textTransform: 'capitalize',
                  color: purple[500],
                  bgcolor: purple[50],
                }}
              >
                {actionBtnText}
              </Button>
            )}
          </Stack>
        )}

        <IconButton
          sx={{
            position: 'absolute',
            top: '0.9rem',
            right: '0.5rem',
            color: blueGrey[400],
            bgcolor: 'transparent',

            '&:hover': {
              bgcolor: blueGrey[200],
              color: blueGrey[900],
            },
          }}
          size="small"
          className=""
          onClick={onClose}
          type="button"
        >
          <HiXMark />
        </IconButton>

        {/* Modal Body (Scrollable) */}

        <Box flex="1" overflow="auto" height="fit-content">
          {children}
        </Box>
      </Stack>
    </Box>
  );
}

export default Modal;
