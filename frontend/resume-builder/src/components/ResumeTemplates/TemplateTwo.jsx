import { useEffect, useRef, useState } from 'react';
import {
  LuGithub,
  LuMail,
  LuMapPinHouse,
  LuPhone,
  LuRss,
  LuUser,
} from 'react-icons/lu';
import { RiLinkedinLine } from 'react-icons/ri';
import ContactInfo from '../ResumeSections/ContactInfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import { formatYearMonth } from '../../utils/helper';
import LanguageSection from '../ResumeSections/LanguageSection';
import WorkExperience from '../ResumeSections/WorkExperience';
import ProjectInfo from '../ResumeSections/ProjectInfo';
import SkillSection from '../ResumeSections/SkillSection';
import CertificationsInfo from '../ResumeSections/CertificationsInfo';
import { Box, Grid, Stack, Typography } from '@mui/material';

const DEFAULT_THEME = ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'];

function Title({ text, color }) {
  return (
    <Box width="fit-content" position="relative" mb="0.625rem">
      <Box
        width="100%"
        height="0.5rem"
        position="absolute"
        bottom="0"
        left="0"
        component="span"
        bgcolor={color}
      ></Box>
      <Typography
        component="h2"
        fontSize="0.875rem"
        fontWeight="700"
        position="relative"
      >
        {text}
      </Typography>
    </Box>
  );
}

function TemplateTwo({ resumeData, colorPalatte, containerWidth }) {
  const themeColors = colorPalatte?.length > 0 ? colorPalatte : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800); // default value
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Calculate the scale factor based on the container width
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth); //Get the actual base width
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <Box
      ref={resumeRef}
      width={containerWidth > 0 ? `${baseWidth}px` : 'auto'}
      height="auto"
      p="0.75rem"
      bgcolor="#fff"
      sx={{
        transform: containerWidth > 0 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
      }}
    >
      <Box px="2.5rem" pt="2.5rem" pb="1.25rem">
        <Stack direction="row" alignItems="center" mb="1.25rem" gap="1.25rem">
          <Stack
            direction="row"
            width="140px"
            height="140px"
            maxWidth="140px"
            alignItems="center"
            justifyContent="center"
            borderRadius="1rem"
            bgcolor={themeColors[1]}
          >
            {resumeData.profileInfo.profilePreviewUrl ? (
              <Box width="140px" height="140px">
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '1rem',
                    objectFit: 'cover',
                  }}
                  alt=""
                />
              </Box>
            ) : (
              <Stack
                direction="row"
                width="140px"
                height="140px"
                alignItems="center"
                justifyContent="center"
                fontSize="3rem"
                color={themeColors[4]}
                className="rounded-full"
              >
                <LuUser />
              </Stack>
            )}
          </Stack>

          <Box>
            <Grid container spacing="0.5rem" alignItems="center">
              <Grid size={6}>
                <Typography component="h2" fontSize="1.5rem" fontWeight="700">
                  {resumeData.profileInfo.fullName}
                </Typography>
                <Typography
                  component="p"
                  fontSize="14px"
                  fontWeight="600"
                  mb="0.5rem"
                >
                  {resumeData.profileInfo.designation}
                </Typography>
                <ContactInfo
                  icon={<LuMapPinHouse />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.location}
                />
              </Grid>

              <Grid size={6}>
                <Stack gap="1.25rem" mt="0.5rem">
                  <ContactInfo
                    icon={<LuMail />}
                    iconBG={themeColors[2]}
                    value={resumeData.contactInfo.email}
                  />

                  <ContactInfo
                    icon={<LuPhone />}
                    iconBG={themeColors[2]}
                    value={resumeData.contactInfo.phone}
                  />
                </Stack>
              </Grid>
              <Grid size={6}>
                {resumeData.contactInfo.linkedin && (
                  <ContactInfo
                    icon={<RiLinkedinLine />}
                    iconBG={themeColors[2]}
                    value={resumeData.contactInfo.linkedin}
                  />
                )}
              </Grid>

              <Grid size={6}>
                <ContactInfo
                  icon={<LuRss />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.website}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      <Box mx="2.5rem" pb="1.25rem">
        <Box>
          <Title text="Professional Summary" color={themeColors[1]} />
          <Typography component="p" fontSize="0.875rem" fontWeight="500">
            {resumeData.profileInfo.summary}
          </Typography>
        </Box>
        <Box mt="1rem">
          <Title text="Work Experience" color={themeColors[1]} />

          {resumeData.workExperience.map((data, index) => (
            <WorkExperience
              key={`work_${index}`}
              company={data.company}
              role={data.role}
              duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(
                data.endDate
              )}`}
              durationColor={themeColors[4]}
              description={data.description}
            />
          ))}
        </Box>

        <Box mt="1rem">
          <Title text="Projects" color={themeColors[1]} />

          {resumeData.projects.map((project, index) => (
            <ProjectInfo
              key={`project_${index}`}
              title={project.title}
              description={project.description}
              githubLink={project.github}
              liveDemo={project.liveDemo}
              bgColor={themeColors[2]}
            />
          ))}
        </Box>

        <Box mt="1rem">
          <Title text="Education" color={themeColors[1]} />
          <Grid container spacing="0.75rem">
            {resumeData.education.map((data, index) => (
              <Grid key={`education_${index}`} size={6}>
                <EducationInfo
                  degree={data.degree}
                  institution={data.institution}
                  duration={`${formatYearMonth(
                    data.startDate
                  )} - ${formatYearMonth(data.endDate)}`}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt="1rem">
          <Title text="Certifications" color={themeColors[1]} />

          <Grid container spacing="1.5rem">
            {resumeData.certifications.map((data, index) => (
              <Grid size={6} key={`cert_${index}`}>
                <CertificationsInfo
                  title={data.title}
                  issuer={data.issuer}
                  year={data.year}
                  bgColor={themeColors[2]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt="1rem">
          <Title text="Skills" color={themeColors[1]} />

          <SkillSection
            skills={resumeData.skills}
            accentColor={themeColors[3]}
            bgColor={themeColors[2]}
          />
        </Box>

        <Grid container spacing="2.5rem" mt="1rem">
          <Grid size={6} className="">
            <Title text="Languages" color={themeColors[1]} />
            <LanguageSection
              languages={resumeData.languages}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </Grid>

          {resumeData.interests.length > 0 &&
            resumeData.interests[0] !== '' && (
              <Grid size={6} className="">
                <Title text="Interests" color={themeColors[1]} />
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  gap="0.75rem"
                  mt="1rem"
                >
                  {resumeData.interests.map((interest, index) => {
                    if (!interest) return null;
                    return (
                      <Typography
                        component="span"
                        fontSize="10px"
                        fontWeight="500"
                        py="0.25rem"
                        borderRadius="0.5rem"
                        px="0.75rem"
                        bgcolor={themeColors[2]}
                        key={`interest_${index}`}
                      >
                        {interest}
                      </Typography>
                    );
                  })}
                </Stack>
              </Grid>
            )}
        </Grid>
      </Box>
    </Box>
  );
}

export default TemplateTwo;
