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

function CertificationForm({
  certifications,
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
        Certifications
      </Typography>
      <Stack mt="1rem" gap="1rem" mb="0.75rem">
        {certifications.map((cert, index) => (
          <Box
            key={index}
            border={`1px solid ${blueGrey[100]}`}
            p="1rem"
            borderRadius="0.5rem"
            position="relative"
          >
            <Grid container spacing="1rem" columnSpacing={2} rowSpacing={1}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`title_${index}`}
                  label="Certificate Title"
                  placeholder="Fullstack Web Developer"
                  type="text"
                  value={cert.title || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'title', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`issuer_${index}`}
                  label="Issuer"
                  placeholder="Coursera / Google / etc."
                  type="text"
                  value={cert.issuer || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'issuer', e.target.value)
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Input
                  id={`year_${index}`}
                  label="Year"
                  placeholder="2024"
                  type="text"
                  value={cert.year || ''}
                  onChange={(e) =>
                    updateArrayItem(index, 'year', e.target.value)
                  }
                />
              </Grid>
            </Grid>

            {certifications.length > 1 && (
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
              issuer: '',
              year: '',
            })
          }
        >
          Add Certificate
        </Button>
      </Stack>
    </Box>
  );
}

export default CertificationForm;
