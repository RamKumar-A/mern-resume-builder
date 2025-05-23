import { Grid, Stack, Typography } from '@mui/material';
import Progress from '../Progress';
import { blueGrey } from '@mui/material/colors';

function SkillSection({ skills, accentColor, bgColor }) {
  return (
    <Grid container columnSpacing="1.25rem" rowSpacing="0.5rem" mb="1.25rem">
      {skills?.map((skill, index) => (
        <SkillInfo
          skill={skill.name}
          key={`skill_${index}`}
          progress={skill.progress}
          accentColor={accentColor}
          bgColor={bgColor}
        />
      ))}
    </Grid>
  );
}

function SkillInfo({ skill, progress, accentColor, bgColor }) {
  return (
    <Grid size={6}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize="12px" fontWeight="600" color={blueGrey[900]}>
          {skill}
        </Typography>
        {progress > 0 && (
          <Progress
            progress={(progress / 100) * 5}
            color={accentColor}
            bgColor={bgColor}
          />
        )}
      </Stack>
    </Grid>
  );
}

export default SkillSection;
