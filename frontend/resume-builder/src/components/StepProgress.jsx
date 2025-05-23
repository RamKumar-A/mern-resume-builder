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
        height="0.25rem"
        borderRadius="0.25rem"
        sx={{
          transition: 'all',
          bgcolor:
            'linear-gradient(90deg,rgba(156, 39, 176, 1) 0%, rgba(123, 31, 162, 1) 50%)',
        }}
        width={`${progress}%`}
      ></Box>
    </Box>
  );
}

export default StepProgress;
