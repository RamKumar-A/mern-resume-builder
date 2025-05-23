import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import Modal from '../../components/Modal';
import CreateResumeForm from './CreateResumeForm';
import { Box, Button, Dialog, Grid, Stack, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (err) {
      console.error('Error fetching resumes.', err);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <Stack py="1.25rem" gap="1.25rem">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="h2" fontSize={15} fontWeight={600}>
            All Resumes
          </Typography>
          <Box>
            <Button
              size="small"
              startIcon={
                <LuCirclePlus
                  style={{
                    backgroundColor: purple[50],
                    color: purple[500],
                    borderRadius: '1rem',
                  }}
                />
              }
              onClick={() => setOpenCreateModal(true)}
              sx={{
                fontWeight: 550,
                bgcolor: '#fff',
                color: purple[500],
                border: `1px solid ${purple[100]}`,
                '&:hover': {
                  border: `1px solid ${purple[200]}`,
                  bgcolor: purple[50],
                },
                textTransform: 'capitalize',
              }}
            >
              Add New Resume
            </Button>
          </Box>
        </Stack>
        <Grid container columnSpacing={2} rowSpacing={2}>
          {allResumes?.map((resume) => (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume?.title}
              lastUpdated={
                resume?.updatedAt
                  ? moment(resume.updatedAt).format('DD MM YYYY')
                  : ''
              }
              onSelect={() => navigate(`/resume/${resume?._id}`)}
            />
          ))}
        </Grid>
      </Stack>

      <Dialog open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
        <CreateResumeForm />
      </Dialog>
    </DashboardLayout>
  );
}

export default Dashboard;

/* <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0 ">
        <div
          className="h-[300px] flex items-center justify-center flex-col gap-5 bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
            <LuCirclePlus className="text-xl text-purple-500" />
          </div>
          <h3 className="font-medium text-gray-800">Add New Resume</h3>
        </div>
        {allResumes?.map((resume) => (
          <ResumeSummaryCard
            key={resume?._id}
            imgUrl={resume?.thumbnailLink || null}
            title={resume?.title}
            lastUpdated={
              resume?.updatedAt
                ? moment(resume.updatedAt).format('DD MM YYYY')
                : ''
            }
            onSelect={() => navigate(`/resume/${resume?._id}`)}
          />
        ))}
      </div> 
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
      >
        <div className="">
          <CreateResumeForm />
        </div>
      </Modal>
      */
