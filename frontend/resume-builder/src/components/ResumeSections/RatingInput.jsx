import { Box, Stack } from '@mui/material';

function RatingInput({
  value = 0,
  total = 5,
  onChange = () => {},
  color = '#9125E6',
  bgColor = '#E9D4FF',
}) {
  // Convert 0-100 to 0-5 scale
  const displayValue = Math.round((value / 100) * total);

  function handleClick(index) {
    // Convert 0-5 scale back to 0-100 for DB
    const newValue = Math.round(((index + 1) / total) * 100);
    onChange(newValue);
  }

  return (
    <Stack direction="row" gap="0.75rem" sx={{ cursor: 'pointer' }}>
      {[...Array(total)].map((_, index) => {
        const isActive = index < displayValue;
        return (
          <Box
            width="1rem"
            height="1rem"
            borderRadius="0.25rem"
            sx={{
              transition: 'all',
            }}
            bgcolor={isActive ? color : bgColor}
            key={index}
            onClick={() => handleClick(index)}
          ></Box>
        );
      })}
    </Stack>
  );
}

export default RatingInput;
