// export const BASE_URL = 'http://localhost:8000';
export const BASE_URL = 'https://mern-resume-builder-backend.onrender.com';

export const API_PATH = {
  AUTH: {
    REGISTER: '/api/auth/register', //Signup
    LOGIN: '/api/auth/login', //Authenticate user & return JWT token
    GET_PROFILE: '/api/auth/profile', //Get logged-in user details
  },
  RESUME: {
    CREATE: '/api/resume', //POST - Create a new resume
    GET_ALL: '/api/resume', //GET - Get all resumes of logged-in user
    GET_BY_ID: (id) => `/api/resume/${id}`, //GET - Get a specific resume
    UPDATE: (id) => `/api/resume/${id}`, // PUT - Update a resume
    DELETE: (id) => `/api/resume/${id}`, //DELETE - Delete a resume
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`, //PUT - Upload Thumbnail and Resume preview image
  },
  IMAGE: {
    UPLOAD_IMAGE: '/api/auth/upload-image',
  },
};
