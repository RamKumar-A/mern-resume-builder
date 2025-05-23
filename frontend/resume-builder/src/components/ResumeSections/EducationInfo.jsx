import { Box, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function EducationInfo({ degree, institution, duration }) {
  return (
    <Box mb="1.25rem">
      <Typography
        fontSize="15px"
        fontWeight="600"
        component="h3"
        color={blueGrey[900]}
      >
        {degree}
      </Typography>
      <Typography
        component="p"
        fontSize="0.875rem"
        fontWeight="500"
        color={blueGrey[700]}
      >
        {institution}
      </Typography>
      <Typography
        component="p"
        fontSize="0.875rem"
        fontWeight="500"
        mt="0.125rem"
        fontStyle="italic"
        color={blueGrey[700]}
      >
        {duration}
      </Typography>
    </Box>
  );
}

export default EducationInfo;
