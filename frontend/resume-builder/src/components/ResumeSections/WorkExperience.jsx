import { Box, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function WorkExperience({
  company,
  role,
  duration,
  durationColor,
  description,
}) {
  return (
    <Box mb="1.25rem">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography
            component="h3"
            fontSize="15px"
            fontWeight="600"
            color={blueGrey[900]}
          >
            {company}
          </Typography>
          <Typography
            component="p"
            fontSize="15px"
            fontWeight="500"
            color={blueGrey[700]}
          >
            {role}
          </Typography>
        </Box>
        <Typography
          component="p"
          fontSize="0.75rem"
          fontWeight="700"
          fontStyle="italic"
          color={durationColor}
        >
          {duration}
        </Typography>
      </Stack>
      <Typography
        component="p"
        fontSize="0.875rem"
        fontWeight="500"
        fontStyle="italic"
        mt="0.2cqw"
        color={blueGrey[600]}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default WorkExperience;
