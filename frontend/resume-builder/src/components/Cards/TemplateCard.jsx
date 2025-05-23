import { Stack } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';

function TemplateCard({ thumbnailImg, isSelected, onSelect }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      height={{ xs: 'auto', md: '350px' }}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          borderColor: purple[300],
        },
      }}
      bgcolor="#fff"
      border={
        isSelected ? `2px solid ${purple[500]}` : `1px solid ${blueGrey[200]}`
      }
      borderRadius="0.5rem"
      overflow="hidden"
      width="100%"
      onClick={onSelect}
    >
      {thumbnailImg ? (
        <img
          src={thumbnailImg}
          alt=""
          style={{
            width: '100%',
            borderRadius: '0.25rem',
          }}
        />
      ) : (
        <div></div>
      )}
    </Stack>
  );
}

export default TemplateCard;
