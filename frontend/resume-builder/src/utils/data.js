export const resumeTemplates = [
  {
    id: '01',
    thumbnailImg: '/temp_images/resume-template-01.jpg',
    colorPalatteCode: 'themeOne',
  },
  {
    id: '02',
    thumbnailImg: '/temp_images/resume-template-02.jpg',
    colorPalatteCode: 'themeTwo',
  },
  {
    id: '03',
    thumbnailImg: '/temp_images/resume-template-03.jpg',
    colorPalatteCode: 'themeThree',
  },
];

export const themeColorPalatte = {
  themeOne: [
    ['#EBFDFF', '#A1F4FD', '#CEFAFE', '#00B8DB', '#4A5565'],

    ['#E9FBF8', '#B4EFE7', '#93E2DA', '#2AC9A0', '#3D4C5A'],
    ['#F5F4FF', '#E0DBFF', '#C9C2F8', '#8579D1', '#4B4B5C'],
    ['#F0FAFF', '#D6F0FF', '#AFDEFF', '#3399FF', '#445361'],
    ['#FFF5F7', '#FFE0EC', '#FAC6D4', '#F6729C', '#5A5A5A'],
    ['#F9FAFB', '#E4E7EB', '#CBD5E0', '#7F9CF5', '#2D3748'],

    ['#F4FFFD', '#D3FDF2', '#B0E9D4', '#34C79D', '#384C48'],
    ['#FFF7F0', '#FFE6D9', '#FFD2BA', '#FF9561', '#4C4743'],
    ['#F9FCFF', '#E3F0F9', '#C0DDEE', '#6CA6CF', '#46545E'],
    ['#FFFDF6', '#FFF4D7', '#FFE7A0', '#FFD000', '#57534E'],
    ['#EFFCFF', '#CBF0FF', '#99E0FF', '#007BA7', '#2B3A42'],

    ['#F7F7F7', '#E4E4E4', '#CFCFCF', '#4A4A4A', '#222222'],
    ['#E3F2FD', '#90CAF9', '#A8D2F4', '#1E88E5', '#0D47A1'],
  ],
};

export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    profilePreviewUrl: '',
    fullName: 'John Doe',
    designation: 'Senior Software Engineer',
    summary:
      'Passionate and results driven developer with 6+years of experience building full stack applications',
  },

  contactInfo: {
    email: 'john.doe@example.com',
    phone: '+1234567890',
    location: '#12 Anywhere, Any City, Any Country',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    website: 'https://ram-personal-portfolio.com',
  },
  workExperience: [
    {
      company: 'Tech Solutions',
      role: 'Senior Frontend Engineer',
      startDate: '2022-03',
      endDate: '2025-04',
      description:
        'Leading the frontend team to build scalable enterprise applications using React js',
    },
    {
      company: 'Coding Dev',
      role: 'Full Stack Developer',
      startDate: '2020-01',
      endDate: '2022-02',
      description:
        'Leading the frontend team to build scalable enterprise applications using React js',
    },
  ],
  education: [
    {
      degree: 'M.Sc. Software Engineering',
      institution: 'Tech University',
      startDate: '2021-08',
      endDate: '2023-05',
    },
    {
      degree: 'B.Sc. Computer Science',
      institution: 'State University',
      startDate: '2017-08',
      endDate: '2021-05',
    },
  ],
  skills: [
    {
      name: 'Javascript',
      progress: '95',
    },
    {
      name: 'React',
      progress: '90',
    },
    {
      name: 'Node.js',
      progress: '85',
    },
    {
      name: 'Typescript',
      progress: '80',
    },
    {
      name: 'MongoDB',
      progress: '75',
    },
  ],
  projects: [
    {
      title: 'Project Manager App',
      description:
        'A task and team management app built with MERN stack. Includes user roles,',
      github: 'https://github.com/',
      liveDemo: 'https://ecommerce-demo.timetoprogram.com',
    },
    {
      title: 'Project Manager App',
      description:
        'A task and team management app built with MERN stack. Includes user roles,',
      github: 'https://github.com/',
      liveDemo: 'https://ecommerce-demo.timetoprogram.com',
    },
    {
      title: 'E-Commerce Platform',
      description:
        'A e-commerce site built with Next.js and Stripe integration. Supports cart, ',
      github: 'https://github.com/',
      liveDemo: 'https://ecommerce-demo.timetoprogram.com',
    },
  ],
  certifications: [
    {
      title: 'Full Stack Web Developer',
      issuer: 'Udemy',
      year: '2023',
    },
    {
      title: 'React Advanced Certification',
      issuer: 'Coursera',
      year: '2022',
    },
  ],
  languages: [
    {
      name: 'English',
      progress: 90,
    },
    {
      name: 'Tamil',
      progress: 100,
    },
  ],
  interests: ['Reading', 'Open Source Contribution', 'Hiking'],
};
