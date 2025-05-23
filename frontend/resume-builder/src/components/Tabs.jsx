import { Box, Stack, Typography } from '@mui/material';
import { blueGrey, purple } from '@mui/material/colors';

function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <Box my="0.5rem">
      <Box display="flex">
        {tabs.map((tab) => (
          <Box
            component="button"
            position="relative"
            px={{ xs: '0.75rem', sm: '1rem' }}
            fontSize="0.875rem"
            fontWeight="500"
            sx={{
              color: activeTab === tab.label ? purple[500] : blueGrey[400],
              '&:hover': {
                color: blueGrey[700],
              },
              cursor: 'pointer',
            }}
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
          >
            <Stack direction="row" alignItems="center">
              <Typography component="span" fontSize="14px" fontWeight="600">
                {tab.label}
              </Typography>
            </Stack>
            {activeTab === tab.label && (
              <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                height="0.125rem"
                sx={{
                  background:
                    'linear-gradient(90deg,rgba(156, 39, 176, 1) 0%, rgba(123, 31, 162, 1) 50%)',
                }}
              ></Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Tabs;
