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
    <Box position="relative" width="fit-content" mb="0.625rem">
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

function TemplateOne({ resumeData, colorPalatte, containerWidth }) {
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
      p="0.75rem"
      bgcolor="#fff"
      width={containerWidth > 0 ? `${baseWidth}px` : 'auto'}
      height="auto"
      sx={{
        transform: containerWidth > 0 ? `scale(${scale})` : 'none',
        transformOrigin: 'top left',
      }}
    >
      <Grid container spacing="2rem">
        <Grid size={4} p="2.5rem" bgcolor={themeColors[0]}>
          <Stack px="0.5rem" alignItems="center">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              width="100px"
              height="100px"
              maxWidth="110px"
              maxHeight="110px"
              className="rounded-full"
              bgcolor={themeColors[1]}
            >
              {resumeData?.profileInfo.profilePreviewUrl ? (
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                  }}
                  className="rounded-full"
                />
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  width="90px"
                  height="90px"
                  fontSize="3rem"
                  className="rounded-full"
                  color={themeColors[4]}
                >
                  <LuUser />
                </Stack>
              )}
            </Stack>

            <Typography
              fontSize="1.25rem"
              fontWeight="700"
              mt="0.75rem"
              component="h2"
            >
              {resumeData.profileInfo.fullName}
            </Typography>
            <Typography fontSize="0.875rem" textAlign="center" component="p">
              {resumeData.profileInfo.designation}
            </Typography>
          </Stack>
          <Box my="1.5rem">
            <Stack gap="1rem">
              <ContactInfo
                icon={<LuMapPinHouse />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.location}
              />
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

              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.linkedin}
                />
              )}

              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<LuGithub />}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.github}
                />
              )}

              <ContactInfo
                icon={<LuRss />}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.website}
              />
            </Stack>

            <Box mt="1.25rem">
              <Title text="Education" color={themeColors[1]} />
              {resumeData.education.map((data, index) => (
                <EducationInfo
                  key={`education_${index}`}
                  degree={data.degree}
                  institution={data.institution}
                  duration={`${formatYearMonth(
                    data.startDate
                  )} - ${formatYearMonth(data.endDate)}`}
                />
              ))}
            </Box>

            <Box mt="1.25rem">
              <Title text="Languages" color={themeColors[1]} />
              <LanguageSection
                languages={resumeData.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={8} pt="2.5rem" pb="1.25rem">
          <Box>
            <Title text="Professional Summary" color={themeColors[1]} />
            <Typography fontSize="0.875rem" fontWeight="500" component="p">
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
                duration={`${formatYearMonth(
                  data.startDate
                )} - ${formatYearMonth(data.endDate)}`}
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
            <Title text="Skills" color={themeColors[1]} />

            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </Box>

          <Box mt="1rem">
            <Title text="Certifications" color={themeColors[1]} />

            <Grid container spacing="0.5rem">
              {resumeData.certifications.map((certification, index) => (
                <Grid size={6} key={`cert_${index}`}>
                  <CertificationsInfo
                    title={certification.title}
                    issuer={certification.issuer}
                    year={certification.year}
                    bgColor={themeColors[2]}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {resumeData.interests.length > 0 &&
            resumeData.interests[0] !== '' && (
              <Box mt="1rem">
                <Title text="Interests" color={themeColors[1]} />
                <Stack direction="row" flexWrap="wrap" gap="0.75rem" mt="1rem">
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
              </Box>
            )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default TemplateOne;
