import { Box, IconButton, Stack, Typography } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';
import { useState } from 'react';
import { LuCheck, LuPencil } from 'react-icons/lu';

function TitleInput({ title, setTitle }) {
  const [showInput, setShowInput] = useState(false);
  return (
    <Stack direction="row" alignItems="center" gap="0.75rem" flex="1">
      {showInput ? (
        <>
          <Box
            component="input"
            type="text"
            placeholder="Resume title"
            sx={{
              outline: 'none',
            }}
            fontSize={{ xs: '14px', sm: '17px' }}
            color="#000"
            fontWeight="600"
            borderBottom={`1px solid ${blueGrey[300]}`}
            bgcolor="transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <IconButton size="small">
            <LuCheck
              style={{
                fontSize: '1rem',
                color: purple[600],
              }}
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            sx={{
              lineClamp: '1',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: '1',
            }}
            className="line-clamp-1"
            fontSize={{ xs: '0.875rem', sm: '1rem' }}
            component="h2"
          >
            {title}
          </Typography>
          <IconButton size="small">
            <LuPencil
              style={{
                fontSize: '0.875rem',
                color: purple[600],
              }}
              onClick={() => setShowInput((prevState) => !prevState)}
            />
          </IconButton>
        </>
      )}
    </Stack>
  );
}

export default TitleInput;
