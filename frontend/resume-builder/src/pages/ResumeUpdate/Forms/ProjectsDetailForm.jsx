import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { blueGrey, grey, purple, red } from '@mui/material/colors';

function ProjectsDetailForm({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) {
  return (
    <Box px="1.25rem" pt="1.25rem">
      <Typography
        fontSize={{ xs: '1rem', sm: '1.125rem' }}
        component="h2"
        fontWeight={500}
        color={blueGrey[900]}
      >
        Projects
      </Typography>
      <Stack gap="1rem" mt="1rem" mb="0.75rem">
        {projectInfo.map((project, index) => (
          <Box
            key={index}
            border={`1px solid ${blueGrey[100]}`}
            p="1rem"
            borderRadius="0.5rem"
            position="relative"
          >
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid size={12}>
                <Input
                  id={`title_${index}`}
                  label="Project Title"
                  placeholder="Portfolio Website"
                  type="text"
                  value={project.title || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'title', e.target.value)
                  }
                />
              </Grid>
              <Grid size={12}>
                <label
                  htmlFor={`description_${index}`}
                  style={{
                    fontSize: '0.8rem',
                    color: grey[600],
                    fontWeight: '500',
                  }}
                >
                  Description
                </label>
                <textarea
                  id={`description_${index}`}
                  placeholder="Short description about the project"
                  className="form-input"
                  style={{
                    marginTop: '0.25rem',
                    width: '100%',
                  }}
                  rows={3}
                  value={project.description || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'description', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`github_${index}`}
                  label="GitHub Link"
                  placeholder="https://github.com/username/project"
                  type="url"
                  value={project.github || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'github', e.target.value)
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`liveURL_${index}`}
                  label="Live Demo URL"
                  placeholder="https://yourproject.live/"
                  type="url"
                  value={project.liveDemo || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'liveDemo', e.target.value)
                  }
                />
              </Grid>
            </Grid>
            {projectInfo.length > 1 && (
              <IconButton
                type="button"
                sx={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  fontSize: '14px',
                  color: red[500],
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
                onClick={() => removeArrayItem(index)}
              >
                <LuTrash2 />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
          type="button"
          sx={{
            bgcolor: '#f3e8ff',
            color: '#6e11b0 ',
            '&:hover': {
              bgcolor: purple[100],
            },
            display: 'flex',
            alignSelf: 'self-start',
            alignItems: 'center',
            fontSize: '0.875rem',
            textTransform: 'capitalize',
          }}
          size="small"
          color="#6e11b0 "
          startIcon={<LuPlus />}
          onClick={() =>
            addArrayItem({
              title: '',
              description: '',
              github: '',
              liveDemo: '',
            })
          }
        >
          Add Project
        </Button>
      </Stack>
    </Box>
  );
}

export default ProjectsDetailForm;
