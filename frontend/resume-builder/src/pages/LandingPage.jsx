import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthDialog from '../components/Modals/AuthDialog';
import { UserContext } from '../context/UserContext';
import { blueGrey, deepPurple, purple } from '@mui/material/colors';

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
                bgcolor: purple[500],
                px: 3,
                py: 1.2,
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
            <FeatureCard
              title="Easy Editing"
              description="Update your resume sections with live preview and instant
                formatting."
            />
            <FeatureCard
              title="Beautiful Templates"
              description="Choose from modern professional templates that are east to
                customize."
            />
            <FeatureCard
              title="One-Click Export"
              description="Download your resume instantly as a high-quality PDF with one
                click."
            />
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

function FeatureCard({ title, description }) {
  return (
    <Grid
      size={{ xs: 12, md: 4 }}
      bgcolor={deepPurple[50]}
      p={3}
      borderRadius={3}
      sx={{
        cursor: 'pointer',
        transition: 'all',
        transitionDuration: '0.2s',
        '&:hover': {
          scale: 1.01,
          boxShadow: 8,
        },
      }}
    >
      <Typography variant="h3" fontSize="1.125rem" gutterBottom>
        {title}
      </Typography>
      <Typography variant="p" color={blueGrey[600]}>
        {description}
      </Typography>
    </Grid>
  );
}

export default LandingPage;
