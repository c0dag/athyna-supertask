import { config } from 'dotenv';
import { PrismaClient, Company, Job, Candidate } from '@prisma/client';

config();

const prisma = new PrismaClient();

const sampleCompanies = [
  {
    name: 'TechCorp Solutions',
    description:
      'Leading technology company specializing in software development and digital transformation.',
  },
  {
    name: 'Creative Agency Pro',
    description:
      'Full-service marketing and design agency helping businesses grow their brand presence.',
  },
  {
    name: 'Healthcare Partners',
    description:
      'Premier healthcare organization committed to providing exceptional patient care.',
  },
  {
    name: 'EduTech Innovations',
    description:
      'Educational technology company revolutionizing learning through innovative solutions.',
  },
  {
    name: 'Green Energy Co',
    description:
      'Sustainable energy solutions provider focused on renewable energy technologies.',
  },
  {
    name: 'FinanceFirst',
    description:
      'Financial services company offering comprehensive investment and banking solutions.',
  },
  {
    name: 'AutoMasters',
    description:
      'Professional automotive services and repair center with state-of-the-art facilities.',
  },
  {
    name: 'EventPro',
    description:
      'Full-service event planning and coordination company for corporate and private events.',
  },
];

const sampleJobs = [
  {
    title: 'Frontend Developer',
    description:
      'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user-facing web applications using modern frameworks.',
    skills: ['React', 'TypeScript', 'CSS', 'HTML'],
    location: 'São Paulo, SP',
    salary: 8000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Backend Developer',
    description:
      'Join our backend team to build robust APIs and microservices. Experience with Node.js and databases required.',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    location: 'Rio de Janeiro, RJ',
    salary: 9000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Full Stack Developer',
    description:
      'Work on both frontend and backend systems. Perfect for developers who love variety and full product ownership.',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    location: 'Remote',
    salary: 10000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: true,
    isApplied: false,
  },
  {
    title: 'React Developer',
    description:
      'Focus on React development for our e-commerce platform. Experience with modern React patterns required.',
    skills: ['React', 'Redux', 'JavaScript', 'CSS'],
    location: 'Belo Horizonte, MG',
    salary: 7500.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'DevOps Engineer',
    description:
      'Help us scale our infrastructure and improve deployment processes. AWS experience preferred.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    location: 'São Paulo, SP',
    salary: 12000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: true,
  },
  {
    title: 'Marketing Manager',
    description:
      'Lead our marketing team to develop and execute comprehensive marketing strategies. Drive brand awareness and customer acquisition.',
    skills: [
      'Digital Marketing',
      'Brand Management',
      'Analytics',
      'Content Strategy',
    ],
    location: 'São Paulo, SP',
    salary: 8500.0,
    type: 'FULL_TIME' as const,
    companyId: 2,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Graphic Designer',
    description:
      'Create visually stunning designs for our brand and marketing materials. Work with cross-functional teams to bring ideas to life.',
    skills: ['Adobe Creative Suite', 'UI/UX Design', 'Branding', 'Typography'],
    location: 'Rio de Janeiro, RJ',
    salary: 5500.0,
    type: 'FULL_TIME' as const,
    companyId: 2,
    isRemote: false,
    isApplied: true,
  },
  {
    title: 'Sales Representative',
    description:
      'Build relationships with clients and drive sales growth. Excellent communication skills and sales experience required.',
    skills: ['Sales', 'Customer Relations', 'Negotiation', 'CRM'],
    location: 'Belo Horizonte, MG',
    salary: 4500.0,
    type: 'FULL_TIME' as const,
    companyId: 2,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Human Resources Specialist',
    description:
      'Manage recruitment, employee relations, and HR processes. Help build a positive workplace culture.',
    skills: ['Recruitment', 'Employee Relations', 'HR Policies', 'Training'],
    location: 'São Paulo, SP',
    salary: 6000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Financial Analyst',
    description:
      'Analyze financial data and provide insights to support business decisions. Strong analytical skills required.',
    skills: ['Financial Analysis', 'Excel', 'Budgeting', 'Reporting'],
    location: 'São Paulo, SP',
    salary: 7000.0,
    type: 'FULL_TIME' as const,
    companyId: 6,
    isRemote: false,
    isApplied: true,
  },
  {
    title: 'Customer Support Specialist',
    description:
      'Provide excellent customer service and resolve customer inquiries. Bilingual candidates preferred.',
    skills: [
      'Customer Service',
      'Communication',
      'Problem Solving',
      'Patience',
    ],
    location: 'Remote',
    salary: 3500.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: true,
    isApplied: true,
  },
  {
    title: 'Content Writer',
    description:
      'Create engaging content for our blog, website, and marketing materials. Strong writing skills and creativity required.',
    skills: ['Content Writing', 'SEO', 'Social Media', 'Research'],
    location: 'Remote',
    salary: 4000.0,
    type: 'FULL_TIME' as const,
    companyId: 2,
    isRemote: true,
    isApplied: false,
  },
  {
    title: 'Project Manager',
    description:
      'Lead cross-functional teams to deliver projects on time and within budget. PMP certification preferred.',
    skills: ['Project Management', 'Agile', 'Leadership', 'Risk Management'],
    location: 'São Paulo, SP',
    salary: 9000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: true,
  },
  {
    title: 'Accountant',
    description:
      'Handle financial records, prepare reports, and ensure compliance with accounting standards.',
    skills: [
      'Accounting',
      'Tax Preparation',
      'Financial Reporting',
      'QuickBooks',
    ],
    location: 'Rio de Janeiro, RJ',
    salary: 5000.0,
    type: 'FULL_TIME' as const,
    companyId: 6,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Chef',
    description:
      'Lead our kitchen team and create innovative menu items. Culinary degree and restaurant experience required.',
    skills: [
      'Culinary Arts',
      'Menu Planning',
      'Kitchen Management',
      'Food Safety',
    ],
    location: 'São Paulo, SP',
    salary: 6500.0,
    type: 'FULL_TIME' as const,
    companyId: 8,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Personal Trainer',
    description:
      'Help clients achieve their fitness goals through personalized training programs. Certification required.',
    skills: ['Fitness Training', 'Nutrition', 'Motivation', 'Exercise Science'],
    location: 'Belo Horizonte, MG',
    salary: 3000.0,
    type: 'PART_TIME' as const,
    companyId: 8,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Real Estate Agent',
    description:
      'Help clients buy and sell properties. Strong networking skills and real estate license required.',
    skills: [
      'Real Estate',
      'Negotiation',
      'Market Analysis',
      'Client Relations',
    ],
    location: 'São Paulo, SP',
    salary: 4000.0,
    type: 'FULL_TIME' as const,
    companyId: 6,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Teacher',
    description:
      'Educate students in elementary education. Teaching certification and passion for education required.',
    skills: [
      'Teaching',
      'Curriculum Development',
      'Classroom Management',
      'Communication',
    ],
    location: 'Rio de Janeiro, RJ',
    salary: 4500.0,
    type: 'FULL_TIME' as const,
    companyId: 4,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Nurse',
    description:
      'Provide patient care in our healthcare facility. Nursing degree and valid license required.',
    skills: [
      'Patient Care',
      'Medical Knowledge',
      'Emergency Response',
      'Compassion',
    ],
    location: 'São Paulo, SP',
    salary: 5500.0,
    type: 'FULL_TIME' as const,
    companyId: 3,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Mechanic',
    description:
      'Diagnose and repair vehicles in our automotive service center. Technical training and experience required.',
    skills: ['Auto Repair', 'Diagnostics', 'Tools', 'Problem Solving'],
    location: 'Belo Horizonte, MG',
    salary: 4000.0,
    type: 'FULL_TIME' as const,
    companyId: 7,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Photographer',
    description:
      'Capture beautiful moments for weddings, events, and commercial projects. Portfolio and equipment required.',
    skills: ['Photography', 'Photo Editing', 'Lighting', 'Creativity'],
    location: 'São Paulo, SP',
    salary: 3500.0,
    type: 'CONTRACT' as const,
    companyId: 2,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Translator',
    description:
      'Translate documents and provide interpretation services. Fluency in multiple languages required.',
    skills: [
      'Translation',
      'Language Skills',
      'Cultural Knowledge',
      'Attention to Detail',
    ],
    location: 'Remote',
    salary: 2500.0,
    type: 'CONTRACT' as const,
    companyId: 2,
    isRemote: true,
    isApplied: false,
  },
  {
    title: 'Event Coordinator',
    description:
      'Plan and execute corporate events and conferences. Strong organizational skills and attention to detail required.',
    skills: [
      'Event Planning',
      'Organization',
      'Vendor Management',
      'Budgeting',
    ],
    location: 'São Paulo, SP',
    salary: 5000.0,
    type: 'FULL_TIME' as const,
    companyId: 8,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Social Worker',
    description:
      'Support individuals and families in need. Social work degree and license required.',
    skills: ['Social Work', 'Counseling', 'Case Management', 'Empathy'],
    location: 'Rio de Janeiro, RJ',
    salary: 4500.0,
    type: 'FULL_TIME' as const,
    companyId: 3,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Electrician',
    description:
      'Install and maintain electrical systems in residential and commercial buildings. Electrical license required.',
    skills: [
      'Electrical Work',
      'Safety Protocols',
      'Troubleshooting',
      'Code Compliance',
    ],
    location: 'Belo Horizonte, MG',
    salary: 5000.0,
    type: 'FULL_TIME' as const,
    companyId: 5,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Data Scientist',
    description:
      'Analyze complex datasets to extract valuable insights and build predictive models. Experience with machine learning required.',
    skills: [
      'Python',
      'Machine Learning',
      'Data Analysis',
      'SQL',
      'TensorFlow',
    ],
    location: 'Remote',
    salary: 11000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: true,
    isApplied: false,
  },
  {
    title: 'UX Designer',
    description:
      'Design intuitive and user-friendly interfaces for web and mobile applications. Strong portfolio and design thinking skills required.',
    skills: [
      'Figma',
      'User Research',
      'Prototyping',
      'Wireframing',
      'UI Design',
    ],
    location: 'São Paulo, SP',
    salary: 7000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: true,
  },
  {
    title: 'Python Developer',
    description:
      'Develop backend services and APIs using Python. Experience with Django or FastAPI preferred.',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'REST APIs'],
    location: 'Remote',
    salary: 9500.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: true,
    isApplied: false,
  },
  {
    title: 'Mobile Developer (React Native)',
    description:
      'Build cross-platform mobile applications using React Native. Experience with mobile development lifecycle required.',
    skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Mobile UI'],
    location: 'Rio de Janeiro, RJ',
    salary: 8500.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Quality Assurance Engineer',
    description:
      'Ensure software quality through testing and automation. Experience with test frameworks and CI/CD required.',
    skills: ['Testing', 'Selenium', 'Cypress', 'Jest', 'Test Automation'],
    location: 'Remote',
    salary: 6500.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: true,
    isApplied: true,
  },
  {
    title: 'Digital Marketing Specialist',
    description:
      'Manage digital marketing campaigns across multiple channels. Experience with Google Ads, Facebook Ads, and analytics required.',
    skills: [
      'Google Ads',
      'Facebook Ads',
      'SEO',
      'Content Marketing',
      'Analytics',
    ],
    location: 'Remote',
    salary: 5500.0,
    type: 'FULL_TIME' as const,
    companyId: 2,
    isRemote: true,
    isApplied: false,
  },
  {
    title: 'Video Editor',
    description:
      'Create engaging video content for marketing campaigns and social media. Proficiency in video editing software required.',
    skills: [
      'Premiere Pro',
      'After Effects',
      'Video Editing',
      'Motion Graphics',
      'Color Grading',
    ],
    location: 'Rio de Janeiro, RJ',
    salary: 4500.0,
    type: 'FULL_TIME' as const,
    companyId: 2,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Software Engineer Intern',
    description:
      'Learn and contribute to software development projects under the guidance of senior engineers. Perfect for students and recent graduates.',
    skills: ['Programming', 'Learning', 'Problem Solving', 'Teamwork'],
    location: 'São Paulo, SP',
    salary: 2000.0,
    type: 'INTERNSHIP' as const,
    companyId: 1,
    isRemote: false,
    isApplied: true,
  },
  {
    title: 'Cybersecurity Analyst',
    description:
      'Protect company systems and data from security threats. Experience with security tools and incident response required.',
    skills: [
      'Cybersecurity',
      'Network Security',
      'Penetration Testing',
      'SIEM',
      'Risk Assessment',
    ],
    location: 'São Paulo, SP',
    salary: 11000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: false,
    isApplied: false,
  },
  {
    title: 'Product Manager',
    description:
      'Lead product development from concept to launch. Strong analytical skills and experience with agile methodologies required.',
    skills: [
      'Product Management',
      'Agile',
      'Analytics',
      'Roadmap Planning',
      'Stakeholder Management',
    ],
    location: 'Remote',
    salary: 12000.0,
    type: 'FULL_TIME' as const,
    companyId: 1,
    isRemote: true,
    isApplied: false,
  },
];

const sampleCandidates = [
  {
    firstName: 'João',
    lastName: 'Silva',
    email: 'joao.silva@email.com',
    phone: '+5511999991111',
  },
  {
    firstName: 'Maria',
    lastName: 'Santos',
    email: 'maria.santos@email.com',
    phone: '+5511999992222',
  },
  {
    firstName: 'Pedro',
    lastName: 'Oliveira',
    email: 'pedro.oliveira@email.com',
    phone: '+5511999993333',
  },
  {
    firstName: 'Ana',
    lastName: 'Costa',
    email: 'ana.costa@email.com',
    phone: '+5511999994444',
  },
  {
    firstName: 'Carlos',
    lastName: 'Pereira',
    email: 'carlos.pereira@email.com',
    phone: '+5511999995555',
  },
  {
    firstName: 'Julia',
    lastName: 'Ferreira',
    email: 'julia.ferreira@email.com',
    phone: '+5511999996666',
  },
];

async function main() {
  const createdCompanies: Company[] = [];
  for (const company of sampleCompanies) {
    const upsertedCompany = await prisma.company.upsert({
      where: { name: company.name },
      update: { description: company.description },
      create: company,
    });
    createdCompanies.push(upsertedCompany);
  }

  const companyMap = new Map<string, string>();
  createdCompanies.forEach((c) => companyMap.set(c.name, c.id));

  const createdJobs: Job[] = [];

  for (const job of sampleJobs) {
    const companyName = sampleCompanies[job.companyId - 1].name;
    const companyId = companyMap.get(companyName);

    if (!companyId) {
      continue;
    }

    const existingJob = await prisma.job.findFirst({
      where: {
        title: job.title,
        companyId: companyId,
      },
    });

    if (existingJob) {
      const updatedJob = await prisma.job.update({
        where: { id: existingJob.id },
        data: {
          title: job.title,
          description: job.description,
          skills: job.skills,
          location: job.location,
          salary: job.salary,
          type: job.type,
          isRemote: job.isRemote,
          isApplied: job.isApplied,
        },
      });
      createdJobs.push(updatedJob);
    } else {
      const createdJob = await prisma.job.create({
        data: {
          title: job.title,
          description: job.description,
          skills: job.skills,
          location: job.location,
          salary: job.salary,
          type: job.type,
          isRemote: job.isRemote,
          isApplied: job.isApplied,
          companyId: companyId,
        },
      });
      createdJobs.push(createdJob);
    }
  }

  const createdCandidates: Candidate[] = [];
  for (const candidate of sampleCandidates) {
    const upsertedCandidate = await prisma.candidate.upsert({
      where: { email: candidate.email },
      update: {
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        phone: candidate.phone,
      },
      create: candidate,
    });
    createdCandidates.push(upsertedCandidate);
  }

  const jobsForApplications = createdJobs.filter((job) => job.isApplied);

  if (jobsForApplications.length === 0 && createdJobs.length > 0) {
    jobsForApplications.push(...createdJobs.slice(0, 5));
  }

  if (jobsForApplications.length > 0 && createdCandidates.length > 0) {
    for (let i = 0; i < jobsForApplications.length; i++) {
      const job = jobsForApplications[i];
      const candidate = createdCandidates[i % createdCandidates.length];

      const existingApplication = await prisma.application.findFirst({
        where: {
          jobId: job.id,
          candidateId: candidate.id,
        },
      });

      if (!existingApplication) {
        await prisma.application.create({
          data: {
            jobId: job.id,
            candidateId: candidate.id,
          },
        });

        await prisma.job.update({
          where: { id: job.id },
          data: { isApplied: true },
        });
      }
    }
  }
}

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
