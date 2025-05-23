import ProfilePhotoSelector from '../../../components/Inputs/ProfilePhotoSelector';
import Input from '../../../components/Inputs/Input';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

function ProfileInfoForm({ updateSection, profileData }) {
  return (
    <Box px="1.25rem" pt="1.25rem">
      <Typography
        fontSize={{ xs: '1rem', sm: '1.125rem' }}
        component="h2"
        fontWeight={500}
        color={blueGrey[900]}
      >
        Personal Information
      </Typography>
      <Stack gap="1.25rem" mt="1rem">
        <ProfilePhotoSelector
          image={profileData?.profileImg || profileData?.profilePreviewUrl}
          setImage={(value) => updateSection('profileImg', value)}
          preview={profileData?.profilePreviewUrl}
          setPreview={(value) => updateSection('profilePreviewUrl', value)}
        />
        <Grid container columnSpacing={2} rowSpacing={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Input
              id={`fullName`}
              value={profileData.fullName || ''}
              onChange={(e) => updateSection('fullName', e.target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Input
              id={`designation`}
              value={profileData.designation || ''}
              onChange={(e) => updateSection('designation', e.target.value)}
              label="Designation"
              placeholder="UI Designer"
              type="text"
            />
          </Grid>
          <Grid size={12} mt="0.75rem">
            <label
              htmlFor="summary"
              style={{
                fontSize: '0.8rem',
                color: grey[600],
                fontWeight: '500',
              }}
            >
              Summary
            </label>
            <textarea
              name=""
              id="summary"
              placeholder="Short Introduction"
              className="form-input"
              rows={4}
              value={profileData.summary || ''}
              onChange={(e) => updateSection('summary', e.target.value)}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default ProfileInfoForm;
