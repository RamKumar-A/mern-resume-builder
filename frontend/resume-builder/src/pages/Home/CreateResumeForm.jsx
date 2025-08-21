import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import { Box, Button, Stack, Typography } from '@mui/material';
import { grey, purple, red } from '@mui/material/colors';

function CreateResumeForm() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Create Resume
  async function handleCreateResume(e) {
    e.preventDefault();

    if (!title) {
      setError('Please add resume title');
      return;
    }

    setError('');

    // Create Resume API Call

    try {
      const response = await axiosInstance.post(API_PATH.RESUME.CREATE, {
        title,
      });
      if (response.data?._id) {
        navigate(`/resume/${response.data._id}`);
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <Stack p="1rem" justifyContent="center">
      <Typography
        component="h3"
        fontSize="1.125rem"
        fontWeight="600"
        color="#000"
      >
        Create New Resume
      </Typography>
      <Typography
        component="p"
        fontSize="0.7rem"
        color={grey[700]}
        mt="5px"
        mb="0.75rem"
      >
        Give your resume a title to get started. You can edit all details later.
      </Typography>

      <Box component="form" onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Resume Title"
          placeholder="Eg: Ram's Resume"
          type="text"
        />

        {error && (
          <Typography
            component="p"
            color={red[500]}
            pb="0.625rem"
            fontSize="0.75rem"
          >
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: purple[500],
            color: '#fff',
          }}
          fullWidth
        >
          Create Resume
        </Button>
      </Box>
    </Stack>
  );
}

export default CreateResumeForm;
