import { Box, Stack } from '@mui/material';
import { cyan } from '@mui/material/colors';

function Progress({ progress = 0, total = 5, bgColor, color }) {
  return (
    <Stack direction="row" gap="0.375rem">
      {[...Array(total)].map((_, i) => (
        <Box
          key={i}
          width="0.5rem"
          height="0.5rem"
          borderRadius="0.25rem"
          sx={{
            transition: 'all',
          }}
          bgcolor={i < progress ? cyan[500] : cyan[100]}
          style={{
            backgroundColor:
              i < progress
                ? color || 'rgba(1,1,1,1)'
                : bgColor || 'rgba(1,1,1,0.1)',
          }}
        ></Box>
      ))}
    </Stack>
  );
}

export default Progress;
