import { Box } from '@mui/material';
import { purple } from '@mui/material/colors';

function StepProgress({ progress }) {
  return (
    <Box
      width="100%"
      bgcolor={purple[50]}
      height="0.25rem"
      overflow="hidden"
      borderRadius="2px"
    >
      <Box
        height="100%"
        borderRadius="0.25rem"
        sx={{
          transition: 'all',
          bgcolor: purple[300],
        }}
        width={`${progress}%`}
      ></Box>
    </Box>
  );
}

export default StepProgress;
