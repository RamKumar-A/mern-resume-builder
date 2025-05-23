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

function WorkExperienceForm({
  workExperience,
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
        Work Experience
      </Typography>

      <Stack gap="1rem" mt="1rem" mb="0.75rem">
        {workExperience.map((experience, index) => (
          <Box
            key={index}
            border={`1px solid ${blueGrey[100]}`}
            p="1rem"
            borderRadius="0.5rem"
            position="relative"
          >
            <Grid container columnSpacing={2} rowSpacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`company_${index}`}
                  value={experience.company || ''}
                  label="Company"
                  placeholder="ABC Corp"
                  type="text"
                  onChange={(e) =>
                    updateArrayItem(index, 'company', e.target.value)
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`role_${index}`}
                  value={experience.role || ''}
                  label="Role"
                  placeholder="Frontend Developer"
                  type="text"
                  onChange={(e) =>
                    updateArrayItem(index, 'role', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`startDate_${index}`}
                  value={experience.startDate || ''}
                  label="Start Date"
                  type="month"
                  onChange={(e) =>
                    updateArrayItem(index, 'startDate', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`endDate_${index}`}
                  value={experience.endDate || ''}
                  label="End Date"
                  type="month"
                  onChange={(e) =>
                    updateArrayItem(index, 'endDate', e.target.value)
                  }
                />
              </Grid>
              <Grid size={12} className="mt-4">
                <label
                  htmlFor={`description_${index}`}
                  style={{
                    fontSize: '13px',
                    color: grey[600],
                    fontWeight: '500',
                  }}
                >
                  Description
                </label>
                <textarea
                  id={`description_${index}`}
                  placeholder="What did you do in this role?"
                  className="form-input "
                  style={{
                    marginTop: '0.25rem',
                    width: '100%',
                  }}
                  rows={3}
                  value={experience.description || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'description', e.target.value)
                  }
                />
              </Grid>
            </Grid>

            {workExperience.length > 1 && (
              <IconButton
                type="button"
                onClick={() => removeArrayItem(index)}
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
              >
                <LuTrash2 />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
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
          type="button"
          onClick={() =>
            addArrayItem({
              company: '',
              role: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
          startIcon={<LuPlus size={14} />}
        >
          Add Work Experience
        </Button>
      </Stack>
    </Box>
  );
}

export default WorkExperienceForm;
