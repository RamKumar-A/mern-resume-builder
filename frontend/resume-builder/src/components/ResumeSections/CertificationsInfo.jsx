import { Box, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function CertificationsInfo({ title, issuer, year, bgColor }) {
  return (
    <Box className="">
      <Typography
        component="h3"
        fontSize="15px"
        fontWeight="600"
        color={blueGrey[900]}
      >
        {title}
      </Typography>
      <Stack direction="row" gap="0.5rem" alignItems="center">
        {year && (
          <Typography
            component="div"
            fontSize="11px"
            fontWeight="700"
            color={blueGrey[800]}
            px="0.75rem"
            py="0.125rem"
            display="inline-block"
            mt="0.5rem"
            borderRadius="0.5rem"
            bgcolor={bgColor}
          >
            {year}
          </Typography>
        )}
        <Typography
          fontSize="12px"
          color={blueGrey[700]}
          fontWeight="500"
          mt="0.25rem"
        >
          {issuer}
        </Typography>
      </Stack>
    </Box>
  );
}

export default CertificationsInfo;
