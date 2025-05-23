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

function SkillsInfoForm({
  skillsInfo,
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
        Skills
      </Typography>
      <Stack mt="1rem" gap="1rem" mb="0.75rem">
        {skillsInfo.map((skill, index) => (
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
                  id={`skill_name_${index}`}
                  label="Skill Name"
                  placeholder="Javascript"
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'name', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack>
                  <label
                    htmlFor=""
                    style={{
                      fontSize: '13px',
                      color: grey[600],
                      fontWeight: '500',
                    }}
                  >
                    Proficiency ({skill.progress / 20 || 0}/5)
                  </label>
                  <Box py="0.75rem" mb="1rem" mt="1rem">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem(index, 'progress', newValue)
                      }
                    />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            {skillsInfo.length > 1 && (
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
              name: '',
              progress: 0,
            })
          }
        >
          Add Skill
        </Button>
      </Stack>
    </Box>
  );
}

export default SkillsInfoForm;
