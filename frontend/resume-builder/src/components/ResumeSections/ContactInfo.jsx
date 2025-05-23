import { Box, Stack, Typography } from '@mui/material';

function ContactInfo({ icon, iconBG, value }) {
  return (
    <Stack direction="row" alignItems="center" gap="0.75rem">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        width="30px"
        height="30px"
        className="rounded-full"
        bgcolor={iconBG}
      >
        {icon}
      </Stack>
      <Typography
        fontSize="12px"
        flex="1"
        sx={{
          wordBreak: 'break-all',
        }}
        fontWeight="500"
        component="p"
      >
        {value}
      </Typography>
    </Stack>
  );
}

export default ContactInfo;
