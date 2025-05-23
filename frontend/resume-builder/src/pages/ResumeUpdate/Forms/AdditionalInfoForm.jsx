import { LuPlus, LuTrash2 } from 'react-icons/lu';
import Input from '../../../components/Inputs/Input';
import RatingInput from '../../../components/ResumeSections/RatingInput';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { blueGrey, grey, purple, red } from '@mui/material/colors';

function AdditionalInfoForm({
  languages,
  interests,
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
        Additional Info
      </Typography>

      {/* Languages Section */}
      <Box mt="1.5rem">
        <Typography fontSize="0.8rem" color={blueGrey[700]} gutterBottom>
          Languages
        </Typography>
        <Stack gap="1rem">
          {languages?.map((lang, index) => (
            <Box
              key={index}
              border={`1px solid ${blueGrey[200]}`}
              p="1rem"
              borderRadius="0.5rem"
              position="relative"
            >
              <Grid container columnSpacing={2} rowSpacing={1}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Input
                    id={`language_${index}`}
                    label="Languages"
                    placeholder="e.g. English"
                    value={lang.name || ''}
                    onChange={(e) =>
                      updateArrayItem(
                        'languages',
                        index,
                        'name',
                        e.target.value
                      )
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <label
                    htmlFor=""
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      color: grey[600],
                      marginBottom: '1.75rem',
                      display: 'block',
                    }}
                  >
                    Proficiency
                  </label>
                  <RatingInput
                    value={lang.progress || 0}
                    onChange={(value) =>
                      updateArrayItem('languages', index, 'progress', value)
                    }
                    total={5}
                    activeColor="#0ea5e9"
                    inactiveColor="#e0f2fe"
                  />
                </Grid>
              </Grid>

              {languages.length > 1 && (
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
                  onClick={() => removeArrayItem('languages', index)}
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
                bgcolor: purple[50],
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
            onClick={() => addArrayItem('languages', { name: '', progress: 0 })}
          >
            Add Language
          </Button>
        </Stack>
      </Box>

      {/* Interests Section */}
      <Box className="mt-8 mb-4">
        <Typography fontSize="0.875rem" className=" text-gray-700">
          Interests
        </Typography>
        <Stack>
          {interests?.map((interest, index) => (
            <Box key={index} className="relative rounded-lg">
              <Input
                id={`interest_${index}`}
                placeholder="e.g. Reading"
                value={interest || ''}
                onChange={(e) =>
                  updateArrayItem('interests', index, null, e.target.value)
                }
              />

              {interests.length > 1 && (
                <IconButton
                  type="button"
                  sx={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    fontSize: '14px',
                    color: red[600],
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() => removeArrayItem('interests', index)}
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
            // variant="outlined"
            startIcon={<LuPlus />}
            onClick={() => addArrayItem('interests', '')}
          >
            Add Interest
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default AdditionalInfoForm;
