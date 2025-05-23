import { useEffect, useState } from 'react';
import { getLightColorFromImage } from '../../utils/helper';
import { Box, Grid, Typography } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';

function ResumeSummaryCard({ imgUrl, title, lastUpdated, onSelect }) {
  const [bgColor, setBgColor] = useState('#ffffff');
  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => setBgColor(color))
        .catch(() => setBgColor('#ffffff'));
    }
  }, [imgUrl]);
  return (
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      sx={{
        cursor: 'pointer',
        '&:hover': {
          borderColor: purple[300],
        },
      }}
      height="300px"
      bgcolor={bgColor}
      overflow="hidden"
      borderRadius="0.5rem"
      border="1px solid #d1d5dcba "
      onClick={onSelect}
    >
      <Box p="1rem">
        {imgUrl ? (
          <Box height="200px" width="100%">
            <img
              src={imgUrl}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '0.25rem',
                objectFit: 'contain',
              }}
            />
          </Box>
        ) : (
          <div className=""></div>
        )}
      </Box>
      <Box width="100%" bgcolor="#fff" px="1rem" py="0.75rem">
        <Typography
          component="h5"
          fontSize="0.875rem"
          fontWeight={500}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {title}
        </Typography>
        <Typography
          component="p"
          fontSize="12px"
          color={blueGrey[500]}
          fontWeight={500}
          marginTop="0.125rem"
        >
          Last Updated: {lastUpdated}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ResumeSummaryCard;
