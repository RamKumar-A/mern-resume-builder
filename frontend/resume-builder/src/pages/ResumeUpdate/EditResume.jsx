import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import TitleInput from '../../components/Inputs/TitleInput';
import { useReactToPrint } from 'react-to-print';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import {
  LuArrowLeft,
  LuArrowRight,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
} from 'react-icons/lu';
import StepProgress from '../../components/StepProgress';
import ProfileInfoForm from './Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationDetailsForm from './Forms/EducationDetailsForm';
import SkillsInfoForm from './Forms/SkillsInfoForm';
import ProjectsDetailForm from './Forms/ProjectsDetailForm';
import CertificationForm from './Forms/CertificationForm';
import AdditionalInfoForm from './Forms/AdditionalInfoForm';
import RenderResume from '../../components/ResumeTemplates/RenderResume';

import { toast } from 'react-hot-toast';
import {
  captureElementAsImage,
  dataURLtoFile,
  fixTailwindColors,
} from '../../utils/helper';
import ThemeSelector from './ThemeSelector';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { amber, purple } from '@mui/material/colors';
import { HiEllipsisVertical } from 'react-icons/hi2';
import MobileActions from '../../components/MobileActions';
import DeleteDialog from '../../components/Modals/DeleteDialog';

function EditResume() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);
  const [openThemeSelector, setOpenThemeSelector] = useState(false);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function handleCloseDeleteDialog() {
    setOpenDeleteDialog(false);
  }

  const [currentPage, setCurrentPage] = useState('profile-info');
  const [progress, setProgress] = useState(0);
  const [resumeData, setResumeData] = useState({
    title: '',
    thumbnailLink: '',
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: '',
      fullName: '',
      designation: '',
      summary: '',
    },
    template: {
      theme: '',
      colorPalatte: '',
    },
    contactInfo: {
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
    },
    workExperience: [
      {
        company: '',
        role: '',
        startDate: '',
        endDate: '',
      },
    ],
    education: [
      {
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
      },
    ],
    skills: [
      {
        name: '',
        progress: '',
      },
    ],
    projects: [
      {
        title: '',
        description: '',
        github: '',
        liveDemo: '',
      },
    ],
    certifications: [
      {
        title: '',
        issuer: '',
        year: '',
      },
    ],
    languages: [
      {
        name: '',
        progress: 0,
      },
    ],
    interests: [],
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate Inputs
  const validateAndNext = (e) => {
    e.preventDefault();
    const errors = [];

    switch (currentPage) {
      case 'profile-info': {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push('Full Name is required');
        if (!designation.trim()) errors.push('Designation is required');
        if (!summary.trim()) errors.push('Summary is required');
        break;
      }

      case 'contact-info': {
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          errors.push('Valid email is required.');

        if (!phone.trim())
          errors.push('Valid 10-digit phone number is required');
        break;
      }

      case 'work-experience':
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company.trim())
              errors.push(`Company is required in experience ${index + 1}`);
            if (!role.trim())
              errors.push(`Role is required in experience ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are required in experience ${index + 1}`
              );
          }
        );
        break;

      case 'education-info':
        resumeData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`Degree is required in education ${index + 1}`);
            if (!institution.trim())
              errors.push(`Institution is required in education ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are required in education ${index + 1}`
              );
          }
        );
        break;

      case 'skills':
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required in skill ${index + 1}`);
          if (progress < 1 || progress > 100)
            errors.push(
              `Skill progress mus be between 1 and 100 in skill ${index + 1}`
            );
        });
        break;

      case 'projects':
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required in project ${index + 1}`);
          if (!description.trim())
            errors.push(
              `Project description is required in project ${index + 1}`
            );
        });
        break;

      case 'certifications':
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(
              `Certification title is required in certification ${index + 1}`
            );
          if (!issuer.trim())
            errors.push(`Issuer is required in certification ${index + 1}`);
        });
        break;

      case 'additionalInfo':
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0].name?.trim()
        )
          errors.push('At least one language is required');

        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        )
          errors.push('At least one interest is required');
        break;

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(', '));
      return;
    }

    // Move to next step
    setErrorMsg('');
    goToNextStep();
  };

  // Function to navigate to the next page
  const goToNextStep = () => {
    const pages = [
      'profile-info',
      'contact-info',
      'work-experience',
      'education-info',
      'skills',
      'projects',
      'certifications',
      'additionalInfo',
    ];

    if (currentPage === 'addtionalInfo') setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      // Set progress as percentage
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Function to navigate to the previous page
  const goBack = () => {
    const pages = [
      'profile-info',
      'contact-info',
      'work-experience',
      'education-info',
      'skills',
      'projects',
      'certifications',
      'additionalInfo',
    ];

    if (currentPage === 'profile-info') navigate('/dashboard');

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      // Update progress
      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case 'profile-info':
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection('profileInfo', key, value);
            }}
          />
        );

      case 'contact-info':
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection('contactInfo', key, value);
            }}
          />
        );

      case 'work-experience':
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem('workExperience', index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem('workExperience', newItem)}
            removeArrayItem={(index) =>
              removeArrayItem('workExperience', index)
            }
            // onNext={validateAndNext}
          />
        );

      case 'education-info':
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem('education', index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem('education', newItem)}
            removeArrayItem={(index) => removeArrayItem('education', index)}
          />
        );

      case 'skills':
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem('skills', index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem('skills', newItem)}
            removeArrayItem={(index) => removeArrayItem('skills', index)}
          />
        );

      case 'projects':
        return (
          <ProjectsDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem('projects', index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem('projects', newItem)}
            removeArrayItem={(index) => removeArrayItem('projects', index)}
          />
        );

      case 'certifications':
        return (
          <CertificationForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem('certifications', index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem('certifications', newItem)}
            removeArrayItem={(index) =>
              removeArrayItem('certifications', index)
            }
          />
        );

      case 'additionalInfo':
        return (
          <AdditionalInfoForm
            languages={resumeData?.languages}
            interests={resumeData?.interests}
            updateArrayItem={(section, index, key, value) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );

      default:
        return null;
    }
  };

  // Update simple nested object (like profileInfo, contactInfo, etc.)
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Update array item (like workExperience[0], skills[1], etc.)
  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value; //for simple strings like in 'interests'
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Add item to array
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // Remove item from array
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  };

  // Fetch resume info by ID
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATH.RESUME.GET_BY_ID(resumeId)
      );
      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || 'Untitled',
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (err) {
      console.error('Error fetching resumes:', err);
    }
  };

  // upload thumbnail and resume profile img
  const uploadResumeImages = async () => {
    try {
      setIsLoading(true);
      fixTailwindColors(resumeRef.current);
      const imageDataUrl = await captureElementAsImage(resumeRef.current);

      // Convert base64 to File
      const thumbnailFile = dataURLtoFile(
        imageDataUrl,
        `resume-${resumeId}.png`
      );

      const profileImageFile = resumeData?.profileInfo.profileImg || null;

      const formData = new FormData();
      if (profileImageFile) formData.append('profileImage', profileImageFile);
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATH.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
      console.log('RESUME_DATA__', resumeData);

      // Call the second API to update other resume data
      await updateResumeDetails(thumbnailLink, profilePreviewUrl);
      toast.success('Resume Updated Successfully');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error uploading images:', err);
      toast.error('Failed to upload images');
    } finally {
      setIsLoading(false);
    }
  };

  const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.put(
        API_PATH.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink: thumbnailLink || '',
          profileInfo: {
            ...resumeData.profileInfo,
            profilePreviewUrl: profilePreviewUrl || '',
          },
        }
      );

      toast.success('Resume Details Updated!');
    } catch (err) {
      console.error('Error capturing image', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Resume
  const handleDeleteResume = async (id) => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line no-unused-vars
      const response = await axiosInstance.delete(API_PATH.RESUME.DELETE(id));
      toast.success('Resume Deleted Successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error capturing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Download Resume
  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

  // Function to update baseWidth based on resume container size
  const updateBaseWidth = () => {
    if (resumeRef.current) {
      setBaseWidth(resumeRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener('resize', updateBaseWidth);

    if (resumeId) {
      fetchResumeDetailsById();
    }

    return () => {
      window.removeEventListener('resize', updateBaseWidth);
    };
  }, []);

  return (
    <DashboardLayout>
      <Box mx="auto">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap="1.25rem"
          bgcolor="#fff"
          borderRadius="0.5rem"
          border="1px solid #f3e8ff "
          py="0.75rem"
          mb="1rem"
          px="1rem"
        >
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
          <MobileActions
            setOpenPreviewModal={setOpenPreviewModal}
            setOpenThemeSelector={setOpenThemeSelector}
            handleDeleteResume={() => handleDeleteResume(resumeId)}
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
          />
          <Stack
            display={{ xs: 'none', sm: 'flex' }}
            direction="row"
            alignItems="center"
            gap="1rem"
          >
            <button
              className="btn-small-light"
              onClick={() => setOpenThemeSelector(true)}
            >
              <LuPalette style={{ fontSize: '1rem' }} />
              <Typography display={{ xs: 'none', md: 'block' }} variant="span">
                Change Theme
              </Typography>
            </button>
            <button
              className="btn-small-light"
              onClick={() => setOpenDeleteDialog(true)}
            >
              <LuTrash2 style={{ fontSize: '1rem' }} />
              <Typography display={{ xs: 'none', md: 'block' }} variant="span">
                Delete
              </Typography>
            </button>
            <button
              className="btn-small-light"
              onClick={() => setOpenPreviewModal(true)}
            >
              <LuDownload style={{ fontSize: '1rem' }} />
              <Typography display={{ xs: 'none', md: 'block' }} variant="span">
                Preview & Download
              </Typography>
            </button>
          </Stack>
        </Stack>
        <Grid container className="" spacing="1.25rem">
          <Grid
            size={{ xs: 12, md: 6 }}
            bgcolor="#fff"
            borderRadius="0.5rem"
            border="1px solid"
            borderColor={purple[100]}
            overflow="hidden"
          >
            <StepProgress progress={progress} />
            {renderForm()}
            <Box className="mx-5">
              {errorMsg && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="0.5rem"
                  color={amber[600]}
                  bgcolor={amber[100]}
                  px="0.5rem "
                  py="0.125rem"
                  my="0.25rem"
                  borderRadius="0.25rem"
                  fontSize="11px"
                  fontWeight="500"
                >
                  <LuCircleAlert style={{ fontSize: '1rem' }} />
                  {errorMsg}
                </Stack>
              )}
              <Stack
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
                gap="0.5rem"
                mt="0.75rem"
                mb="1.25rem"
              >
                <ButtonGroup size="small" color={purple[800]}>
                  <Button
                    // className="btn-small-light"
                    onClick={goBack}
                    disabled={isLoading}
                    startIcon={<LuArrowLeft size={12} />}
                    size="small"
                    sx={{
                      color: purple[700],
                      bgcolor: '',
                      fontSize: '0.7rem',
                    }}
                  >
                    <Typography variant="span" className="">
                      Back
                    </Typography>
                  </Button>
                  <Button
                    // className="btn-small-light"
                    onClick={uploadResumeImages}
                    disabled={isLoading}
                    startIcon={<LuSave size={12} />}
                    size="small"
                    sx={{
                      bgcolor: '',
                      fontSize: '0.7rem',
                      color: purple[700],
                    }}
                  >
                    <Typography variant="span" className="">
                      {isLoading ? 'Updating...' : 'Save'}
                    </Typography>
                  </Button>
                  <Button
                    size="small"
                    // className="btn-small"
                    onClick={validateAndNext}
                    disabled={isLoading}
                    sx={{
                      color: purple[700],
                      pointerEvents: currentPage === 'additionalInfo' && 'none',
                      opacity: currentPage === 'additionalInfo' && '0.5',
                      fontSize: '0.7rem',
                    }}
                    endIcon={
                      currentPage !== 'additionalInfo' && (
                        <LuArrowRight size={12} />
                      )
                    }
                  >
                    <Typography variant="span" className="">
                      Next
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Stack>
            </Box>
          </Grid>
          <Grid ref={resumeRef} className="h-[100vh]" size={{ xs: 12, md: 6 }}>
            {/* Resume Template */}
            <RenderResume
              templateId={resumeData?.template?.theme || ''}
              resumeData={resumeData}
              colorPalatte={resumeData?.template?.colorPalatte || ''}
              containerWidth={baseWidth}
            />
          </Grid>
        </Grid>
      </Box>
      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <Box component="div" width="90vw" height="80vh">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template,
              }));
            }}
            resumeData={resumeData}
            onClose={() => setOpenThemeSelector(false)}
          />
        </Box>
      </Modal>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload style={{ fontSize: '1rem' }} />}
        onActionClick={() => reactToPrintFn()}
      >
        <Grid container>
          <Grid size={12} component="div" ref={resumeDownloadRef}>
            <RenderResume
              templateId={resumeData?.template?.theme || ''}
              resumeData={resumeData}
              colorPalatte={resumeData?.template?.colorPalatte}
              containerWidth={800}
            />
          </Grid>
        </Grid>
      </Modal>
      <DeleteDialog
        handler={() => handleDeleteResume(resumeId)}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      />
    </DashboardLayout>
  );
}

export default EditResume;
