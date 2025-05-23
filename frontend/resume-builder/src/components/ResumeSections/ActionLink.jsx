import { Stack, Typography } from '@mui/material';

function ActionLink({ icon, link, bgColor }) {
  return (
    <Stack direction="row" alignItems="center" gap="0.75rem">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        className="rounded-full"
        width="25px"
        height="25px"
        bgcolor={bgColor}
      >
        {icon}
      </Stack>
      <Typography
        component="p"
        fontSize="13px"
        fontWeight="500"
        sx={{
          textDecoration: 'underline',
          cursor: 'pointer',
          wordBreak: 'break-all',
        }}
      >
        {link}
      </Typography>
    </Stack>
  );
}

export default ActionLink;
