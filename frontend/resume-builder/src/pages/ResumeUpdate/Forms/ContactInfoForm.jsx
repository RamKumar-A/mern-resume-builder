import { Grid, Stack, Typography } from '@mui/material';
import Input from '../../../components/Inputs/Input';
import { blueGrey } from '@mui/material/colors';

function ContactInfoForm({ contactInfo, updateSection }) {
  return (
    <Stack gap="1.25rem" px="1.25rem" pt="1.25rem">
      <Typography
        fontSize={{ xs: '1rem', sm: '1.125rem' }}
        component="h2"
        fontWeight={500}
        color={blueGrey[900]}
      >
        Contact Information
      </Typography>
      {/* <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      <Grid container py={2} columnSpacing={2} rowSpacing={1}>
        <Grid size={12}>
          <Input
            id="address"
            label="Address"
            placeholder="Short Address"
            type="text"
            value={contactInfo.location || ''}
            onChange={(e) => updateSection('location', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
            value={contactInfo.email || ''}
            onChange={(e) => updateSection('email', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id="phoneNumber"
            label="Phone Number"
            placeholder="9999999999"
            type="text"
            value={contactInfo.phone || ''}
            onChange={(e) => updateSection('phone', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id="linkedin"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
            type="text"
            value={contactInfo.linkedin || ''}
            onChange={(e) => updateSection('linkedin', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id="github"
            label="GitHub"
            placeholder="https://github.com/in/username"
            type="text"
            value={contactInfo.github || ''}
            onChange={(e) => updateSection('github', e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Input
            id="portfolio"
            label="Portfolio / Website"
            placeholder="https://yourwebsite.com"
            type="text"
            value={contactInfo.website || ''}
            onChange={(e) => updateSection('website', e.target.value)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default ContactInfoForm;
