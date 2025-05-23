import { LuExternalLink, LuGithub } from 'react-icons/lu';
import ActionLink from './ActionLink';
import { Box, Stack, Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

function ProjectInfo({
  title,
  description,
  githubLink,
  liveDemo,
  bgColor,
  isPreview,
}) {
  return (
    <Box className="pb-2">
      <Typography
        component="h3"
        fontSize={isPreview ? '0.75rem' : '1rem'}
        fontWeight="600"
        color={blueGrey[900]}
      >
        {title}
      </Typography>
      <Typography
        component="p"
        fontSize="0.875rem"
        mt="0.25rem"
        fontWeight="500"
        color={blueGrey[700]}
      >
        {description}
      </Typography>
      <Stack direction="row" alignItems="center" gap="0.75rem" mt="0.5rem">
        {githubLink && (
          <ActionLink icon={<LuGithub />} link={githubLink} bgColor={bgColor} />
        )}

        {githubLink && (
          <ActionLink
            icon={<LuExternalLink />}
            link={liveDemo}
            bgColor={bgColor}
          />
        )}
      </Stack>
    </Box>
  );
}

export default ProjectInfo;
