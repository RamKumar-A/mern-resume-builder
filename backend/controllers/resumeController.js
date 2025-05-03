import path from 'path';
import fs from 'fs';
import Resume from '../models/resumeModel.js';

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private

const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // Default template
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
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
          description: '',
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
          progress: 0,
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
      interests: [''],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
    });

    await newResume.save();

    res.status(201).json(newResume);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create resume', error: err.message });
  }
};

// @desc    Get all resumes for logged-in user
// @route   GET /api/resumes
// @access  Private

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.json(resumes);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create resume', error: err.message });
  }
};

// @desc   Get single resume by ID
// @route   POST /api/resumes/:id
// @access  Private

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create resume', error: err.message });
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private

const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: 'Resume not found or unauthorized' });
    }

    // console.log(resume);
    // Merge updates from req.body into existing resume
    Object.assign(resume, req.body);

    // Save updated resume
    const savedResume = await resume.save();
    res.json(savedResume);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create resume', error: err.message });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found or unauthorized',
      });
    }

    // Delete thumbnailLink and profilePreviewLink images from uploads folder
    const uploadsFolder = path.dirname('..', 'uploads');
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Failed to create resume', error: err.message });
  }
};

export {
  createResume,
  getResumeById,
  getUserResumes,
  updateResume,
  deleteResume,
};
