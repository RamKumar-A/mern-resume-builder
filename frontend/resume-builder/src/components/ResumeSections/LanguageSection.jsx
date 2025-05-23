import { Box, Stack, Typography } from '@mui/material';
import Progress from '../Progress';
import { blueGrey } from '@mui/material/colors';

function LanguageSection({ bgColor, accentColor, languages }) {
  return (
    <Box className="">
      {languages.map((language, index) => (
        <LanguageInfo
          key={`language_${index}`}
          language={language.name}
          progress={language.progress}
          accentColor={accentColor}
          bgColor={bgColor}
        />
      ))}
    </Box>
  );
}

function LanguageInfo({ language, progress, accentColor, bgColor }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize="12px" fontWeight="600" color={blueGrey[700]}>
        {language}
      </Typography>
      {progress > 0 && (
        <Progress
          progress={(progress / 100) * 5}
          bgColor={bgColor}
          color={accentColor}
        />
      )}
    </Stack>
  );
}

export default LanguageSection;
