export interface Project {
  id: string;
  title: string;
  category: 'Web Apps' | 'E-Commerce' | 'UI/UX Design' | 'Mobile Apps' | 'AI Tools';
  subtitle: string;
  description: string;
  status: 'BUILD COMPLETE' | 'IN DEVELOPMENT' | 'FEATURED';
  image: string;
  frameworks: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  client?: string;
  variant?: 'standard' | 'showcase' | 'media' | 'wordmark';
}

export interface Skill {
  name: string;
  percentage: number;
  category: 'Frontend' | 'Backend' | 'UI/UX & Design' | 'Cloud & AI' | 'Languages';
  iconName: string;
  color: string;
  experienceYears: number;
  projectsCount: number;
}

export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  basePrice: string;
  features: string[];
  deliverables: string[];
  tag: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectRef?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  serviceInterest: string;
  budget: string;
  message: string;
}

export interface QuoteItem {
  serviceId: string;
  title: string;
  price: number;
}
