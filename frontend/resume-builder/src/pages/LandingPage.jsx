import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthDialog from '../components/Modals/AuthDialog';
import { UserContext } from '../context/UserContext';
import { blueGrey } from '@mui/material/colors';

function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  function handleCTA() {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <Box width="100%" minHeight="100%">
      <Box className="">
        {/* Hero Content */}
        <Stack direction={{ md: 'row' }} py={8} alignItems="center">
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography
              fontSize="3rem"
              variant="h1"
              component={'h2'}
              fontWeight={'700'}
              gutterBottom
            >
              Build Your{' '}
              <Typography
                component="span"
                fontSize="inherit"
                fontWeight="inherit"
                className=" animate-text-shine"
                color="transparent"
                sx={{
                  backgroundClip: 'text',
                  backgroundImage:
                    'radial-gradient(circle, #7182ff 0%, #3cff52 100%)',
                  backgroundSize: '200% 200%',
                }}
              >
                Resume Effortlessly
              </Typography>
            </Typography>
            <Typography
              fontSize={'1.125rem'}
              gutterBottom
              fontStyle="1.125rem"
              color={blueGrey[700]}
              mb={4}
            >
              Craft a standout resume in minutes with our smart and intuitive
              resume builder.
            </Typography>
            <Button
              className=" transition-colors "
              onClick={handleCTA}
              variant="contained"
              sx={{
                bgcolor: '#000',
                px: 3,
                py: 1.5,
                borderRadius: 2.5,
              }}
            >
              Get Started
            </Button>
          </Box>
          <Box width={{ xs: '100%', sm: '50%' }}></Box>
        </Stack>

        <Box>
          <Typography
            fontSize="1.5rem"
            textAlign="center"
            fontWeight={700}
            pb={5}
          >
            Features That Make You Shine
          </Typography>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 4 }}
              bgcolor={blueGrey[50]}
              p={3}
              borderRadius={3}
              sx={{
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <Typography variant="h3" fontSize="1.125rem" gutterBottom>
                Easy Editing
              </Typography>
              <Typography variant="p" color={blueGrey[600]}>
                Update your resume sections with live preview and instant
                formatting.
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 4 }}
              bgcolor={blueGrey[50]}
              borderRadius={3}
              p={3}
              sx={{
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <Typography variant="h3" fontSize="1.125rem" gutterBottom>
                Beautiful Templates
              </Typography>
              <Typography variant="p" color={blueGrey[600]}>
                {' '}
                Choose from modern professional templates that are east to
                customize.
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, md: 4 }}
              bgcolor={blueGrey[50]}
              p={3}
              borderRadius={3}
              sx={{
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <Typography variant="h3" fontSize="1.125rem" gutterBottom>
                One-Click Export
              </Typography>
              <Typography variant="p" color={blueGrey[600]}>
                {' '}
                Download your resume instantly as a high-quality PDF with one
                click.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography
          textAlign="center"
          p="1.25rem"
          mt="1.25rem"
          fontSize="0.875rem"
          bgcolor={blueGrey[50]}
        >
          Made with ❤️... Happy Coding
        </Typography>

        <AuthDialog
          isOpen={openAuthModal}
          onClose={() => setOpenAuthModal(false)}
        />
      </Box>
    </Box>
  );
}

export default LandingPage;
