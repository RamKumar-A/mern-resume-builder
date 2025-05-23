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
import { blueGrey, purple, red } from '@mui/material/colors';

function EducationDetailsForm({
  educationInfo,
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
        Education
      </Typography>
      <Stack mt="1rem" gap="1rem" mb="0.75rem">
        {educationInfo?.map((education, index) => (
          <Box
            key={index}
            border={`1px solid ${blueGrey[100]}`}
            p="1rem"
            borderRadius="0.5rem"
            position="relative"
          >
            <Grid container gap="1rem" columnSpacing={2} rowSpacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`degree_${index}`}
                  label="Degree"
                  placeholder="B.Sc in Computer Science"
                  type="text"
                  value={education.degree || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'degree', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`institution_${index}`}
                  label="Institution"
                  placeholder="XYZ University"
                  type="text"
                  value={education.institution || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'institution', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`startDate_${index}`}
                  label="Start Date"
                  type="month"
                  value={education.startDate || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'startDate', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`endDate_${index}`}
                  label="End Date"
                  type="month"
                  value={education.endDate || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'endDate', e.target.value)
                  }
                />
              </Grid>
            </Grid>
            {educationInfo?.length > 1 && (
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
          onClick={() =>
            addArrayItem({
              degree: '',
              institution: '',
              startDate: '',
              endDate: '',
            })
          }
          startIcon={<LuPlus />}
        >
          Add Education
        </Button>
      </Stack>
    </Box>
  );
}

export default EducationDetailsForm;
