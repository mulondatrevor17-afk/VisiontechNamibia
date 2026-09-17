import { Project, Skill, Service, ExperienceItem, Testimonial } from '../types';

// Prefer public/images assets (served from /images/*). Keep names consistent with src/assets filenames.
export const AVATAR_IMAGE = '/images/trevor.png';
export const LOGO_IMAGE = '/images/logo.png';
export const HERO_IMAGE = '/images/trevor.png';
export const DARK_WORKSPACE_IMAGE = '/images/dark_workspace_desk_1785092228048.jpg';

export const COMPANY_INFO = {
  name: "VisionTech",
  fullName: "VisionTech Namibia",
  tagline: "Modern Web Design & Development",
  heroHeading: "We Build Digital Experiences",
  heroDescription: "Namibia's modern web design studio. Professional websites, e-commerce stores, and custom digital solutions for businesses in Windhoek and beyond.",
  founder: "Trevor Mulonda",
  role: "Founder & Lead Developer",
  location: "Windhoek, Namibia",
  email: "info@visiontechna.online",
  phone: "+264 81 567 3119",
  whatsapp: "+264 81 567 3119",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  aboutShort: "VisionTech is a Windhoek-based web design and development studio founded by Trevor Mulonda in 2023, specializing in creating modern, high-performance websites for Namibian businesses.",
  aboutLong: "Started in 2023, VisionTech was built on a passion for modern web technologies and a drive to help businesses in Namibia stand out online. Over the past 3 years, I've designed and developed 10 working websites and web platforms spanning e-commerce, luxury home decor, auto trading, commercial portfolios, logistics, and web applications. As a dedicated web developer, I bring modern frameworks (React, Vue, Tailwind CSS), clean code, and fast turnaround times to every build — ready to partner with new clients and bring their digital vision to life.",
  stats: {
    projectsDelivered: "10",
    happyClients: "10 Builds",
    yearsExperience: "3 Years",
    satisfactionRate: "100%",
    avgDelivery: "7d",
    responseTime: "2h"
  }
};

export const SKILLS_DATA: Skill[] = [
  {
    name: "React & Vue.js",
    percentage: 95,
    category: "Frontend",
    iconName: "Atom",
    color: "#61dafb",
    experienceYears: 3,
    projectsCount: 10
  },
  {
    name: "Tailwind CSS & UI/UX",
    percentage: 92,
    category: "UI/UX & Design",
    iconName: "Palette",
    color: "#38bdf8",
    experienceYears: 3,
    projectsCount: 10
  },
  {
    name: "TypeScript & Node.js",
    percentage: 90,
    category: "Backend",
    iconName: "Server",
    color: "#3178c6",
    experienceYears: 3,
    projectsCount: 8
  },
  {
    name: "E-Commerce & Gateways",
    percentage: 88,
    category: "Frontend",
    iconName: "ShoppingBag",
    color: "#e94e33",
    experienceYears: 3,
    projectsCount: 6
  },
  {
    name: "SEO & Web Performance",
    percentage: 92,
    category: "Cloud & AI",
    iconName: "Search",
    color: "#10b981",
    experienceYears: 3,
    projectsCount: 10
  },
  {
    name: "Firebase & PostgreSQL",
    percentage: 86,
    category: "Backend",
    iconName: "Database",
    color: "#ffca28",
    experienceYears: 3,
    projectsCount: 6
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-ewiwi",
    title: "EWIWI Investment CC",
    category: "Web Apps",
    subtitle: "Showcase: Commercial investment portal & property listings",
    description: "A showcase site for EWIWI Investment CC featuring signature architectural projects, live property listings, and a streamlined contact workflow.",
    status: "FEATURED",
    image: '/images/ewiwi.png',
    frameworks: ["React", "TailwindCSS", "Netlify"],
    features: ["Live Listings", "Interactive Map", "Contact Workflows", "Responsive Gallery"],
    liveUrl: "https://ewiwi.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "EWIWI Investment CC",
    variant: 'showcase'
  },
  {
    id: "proj-ragazzi",
    title: "Ragazzi Clothing",
    category: "E-Commerce",
    subtitle: "Modern fashion & urban streetwear e-commerce storefront",
    description: "A custom e-commerce shopping platform for Ragazzi Clothing featuring bespoke apparel showcases, dynamic size selection, real-time stock indicators, and direct WhatsApp order flow.",
    status: "FEATURED",
    image: '/images/Raggazi.png',
    frameworks: ["React", "TailwindCSS", "Netlify"],
    features: ["Product Showcase", "Bespoke Varsity Jacket Display", "Size & Color Selection", "Stock Status Tracker", "Direct WhatsApp Ordering"],
    liveUrl: "https://ragazzi1.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "Ragazzi Clothing",
    variant: 'showcase'
  },
  {
    id: "proj-hermano",
    title: "Hermanos Home Decor",
    category: "UI/UX Design",
    subtitle: "Luxury mirrors, custom wall decor & interior enhancements",
    description: "A luxury interior decor and mirror installation website featuring interactive product galleries, custom wall decor showcases, LED mirror collections, and instant consultation requests.",
    status: "FEATURED",
    image: '/images/hermanodecor.png',
    frameworks: ["React", "TailwindCSS", "Netlify"],
    features: ["Luxury Mirror Showcase", "Custom Wall Decor Catalogs", "Consultation Inquiries", "Dark Luxury Aesthetic", "Mobile Optimized"],
    liveUrl: "https://hermanodecor.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "Hermanos Home Decor Namibia",
    variant: 'showcase'
  },
  {
    id: "proj-ttp",
    title: "TTP Auto Trading",
    category: "Web Apps",
    subtitle: "Premium imported vehicles & direct car sourcing platform",
    description: "A digital vehicle showroom for TTP Auto Trading featuring imported cars from Japan and the UK, searchable vehicle inventory, wishlist system, and direct quote requests.",
    status: "FEATURED",
    image: '/images/ttpauto.png',
    frameworks: ["React", "TailwindCSS", "Netlify"],
    features: ["Imported Vehicle Catalog", "Vehicle Search & Filter", "Wishlist System", "Instant Call & Quote", "How-To-Buy Guide"],
    liveUrl: "https://ttpauto.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "TTP Auto Trading",
    variant: 'showcase'
  },
  {
    id: "proj-1",
    title: "SwiftHaul Logistics",
    category: "E-Commerce",
    subtitle: "Full-scale transport and logistics company website",
    description: "Full-scale transport and logistics company website covering all 14 Namibian regions with service-zones map, real-time shipment quote request forms, and fleet routing capabilities.",
    status: "BUILD COMPLETE",
    image: '/images/logistics.png',
    frameworks: ["React", "Node.js", "Express", "TailwindCSS"],
    features: ["All 14 Regions Coverage", "Service-Zones Map", "Instant Quote Form", "Fleet Management"],
    liveUrl: "https://swifthaulna.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "SwiftHaul Logistics"
  },
  {
    id: "proj-2",
    title: "Elite Private School",
    category: "Web Apps",
    subtitle: "Full school website with enrollment forms & parent portal",
    description: "Full school website with enrollment forms, event calendar, program listings, parent portal access, and digital student gradebook.",
    status: "BUILD COMPLETE",
    image: '/images/elite_private_school.png',
    frameworks: ["Vue.js", "Firebase", "TypeScript", "TailwindCSS"],
    features: ["Enrollment Forms", "Event Calendar", "Program Listings", "Parent Portal Access"],
    liveUrl: "https://eliteprivateschool.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "Elite Private School Windhoek"
  },
  {
    id: "proj-3",
    title: "Savanna Restaurant",
    category: "UI/UX Design",
    subtitle: "Elegant restaurant website with interactive menu & reservation system",
    description: "Elegant restaurant website with interactive menu display, table reservation system, private dining booking, and chef specials gallery.",
    status: "BUILD COMPLETE",
    image: '/images/savanna_restaurant.png',
    frameworks: ["React", "TailwindCSS", "Node.js"],
    features: ["Interactive Menu Display", "Table Reservation System", "Private Dining Booking", "Photo Gallery"],
    liveUrl: "https://savanarestaurant.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "Savanna Restaurant"
  },
  {
    id: "proj-4",
    title: "Namibia Legal Partners",
    category: "UI/UX Design",
    subtitle: "Professional law firm website with consultation booking",
    description: "Professional law firm website with practice area pages, attorney profiles, encrypted document intake, and online consultation booking.",
    status: "BUILD COMPLETE",
    image: '/images/leagal.png',
    frameworks: ["React", "TailwindCSS", "TypeScript"],
    features: ["Practice Area Pages", "Attorney Profiles", "Consultation Booking", "Secure Client Form"],
    liveUrl: "https://leagalnam.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "Namibia Legal Partners"
  },
  {
    id: "proj-5",
    title: "Amani Care Clinic",
    category: "Web Apps",
    subtitle: "Medical clinic website with doctor listings & appointment booking",
    description: "Medical clinic website with doctor listings, appointment booking, medical service pages, patient FAQs, and prescription request forms.",
    status: "BUILD COMPLETE",
    image: '/images/hospital.png',
    frameworks: ["React", "TypeScript", "Firebase", "TailwindCSS"],
    features: ["Doctor Directory", "Appointment Booking", "Medical Service Catalog", "Patient FAQs"],
    liveUrl: "https://amanicare.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "Amani Care Clinic"
  },
  {
    id: "proj-6",
    title: "NamBuild Construction",
    category: "Web Apps",
    subtitle: "Construction company website with portfolio showcase",
    description: "Construction company website with portfolio showcase, civil engineering service listings, site progress galleries, and tender inquiry forms.",
    status: "BUILD COMPLETE",
    image: '/images/nambuild_construction.png',
    frameworks: ["Vue.js", "TailwindCSS", "Node.js"],
    features: ["Portfolio Showcase", "Civil Service Listings", "Project Galleries", "Tender Inquiry Form"],
    liveUrl: "https://nambuild.netlify.app/",
    githubUrl: "",
    year: "2024",
    client: "NamBuild Construction"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: "serv-1",
    title: "01 — Business Website Development",
    shortDesc: "A professional website built around your brand, goals, and audience. Fast, responsive, and SEO-ready.",
    fullDesc: "Professional, custom-built websites designed around your brand, goals, and audience. We handle everything from design to launch — delivering a fast, responsive, SEO-ready site.",
    iconName: "Code",
    basePrice: "N$ 1,500",
    features: ["Custom Design", "Mobile Responsive", "Speed Optimized", "CMS Integration", "Contact Forms"],
    deliverables: ["Custom Source Code", "Domain & Host Setup", "SEO Optimization", "30-Day Support"],
    tag: "01"
  },
  {
    id: "serv-2",
    title: "02 — E-Commerce Development",
    shortDesc: "Turn your product into an online business. Fully functional online stores with secure payments.",
    fullDesc: "Turn your product into an online business. Fully functional online stores with secure payment gateways, inventory management, and a checkout experience engineered to maximize conversions.",
    iconName: "ShoppingBag",
    basePrice: "N$ 5,500",
    features: ["Product Management", "Secure Payments", "Cart & Checkout", "Order Tracking", "Mobile Shopping"],
    deliverables: ["Full E-Commerce Portal", "Payment Gateway Integration", "Inventory Training", "Analytics Dashboard"],
    tag: "02"
  },
  {
    id: "serv-3",
    title: "03 — Website Redesign",
    shortDesc: "Transform your outdated website into a modern, high-converting platform while preserving brand equity.",
    fullDesc: "Is your current website slow, dated, or underperforming? We redesign it into a modern, high-converting platform — preserving your content and brand equity while dramatically improving everything.",
    iconName: "Layout",
    basePrice: "N$ 3,500",
    features: ["Content Migration", "Brand Refresh", "UX Overhaul", "Faster Load Time", "SEO Preservation"],
    deliverables: ["Fresh UI/UX Design", "Content Migration Report", "Lighthouse Speed Guarantee"],
    tag: "03"
  },
  {
    id: "serv-4",
    title: "04 — SEO Optimization",
    shortDesc: "Get found on Google. Keyword research, technical audit, and content optimization to rank higher.",
    fullDesc: "Get found on Google. We research the keywords your customers are searching, then optimize your site's structure, content, and technical health to rank higher and attract organic traffic.",
    iconName: "Search",
    basePrice: "N$ 1,500",
    features: ["Keyword Research", "On-Page SEO", "Technical Audit", "Local SEO", "Performance Reports"],
    deliverables: ["Keywords Strategy Doc", "Google Search Console Setup", "Google Maps Business Listing"],
    tag: "04"
  },
  {
    id: "serv-5",
    title: "05 — Maintenance & Support",
    shortDesc: "Ongoing care to keep your website fast, secure, and current. Updates, patches, backups, priority support.",
    fullDesc: "Your website needs ongoing care to stay fast, secure, and current. Our maintenance plans cover updates, security patches, uptime monitoring, and priority support.",
    iconName: "ShieldCheck",
    basePrice: "N$ 500 / mo",
    features: ["Monthly Updates", "Security Patching", "Daily Backups", "Uptime Monitoring", "Priority Support"],
    deliverables: ["Monthly Health Report", "Security Audit", "Uptime SLA Guarantee"],
    tag: "05"
  },
  {
    id: "serv-6",
    title: "06 — Hosting & Deployment",
    shortDesc: "Domain, SSL, fast servers, zero-downtime launches, and continuous integration handled end-to-end.",
    fullDesc: "We set up and manage your hosting, domain, and SSL so you don't have to worry. Fast servers, continuous deployment, zero-downtime launches — end-to-end handled.",
    iconName: "Server",
    basePrice: "N$ 350 / mo",
    features: ["Domain Setup", "SSL Certificate", "Fast Servers", "CI/CD Pipeline", "Email Hosting"],
    deliverables: ["DNS Configuration", "SSL Auto-renewal", "Custom Business Emails"],
    tag: "06"
  }
];

export const PRICING_PACKAGES = [
  {
    id: "starter",
    name: "Starter Package",
    price: "N$ 1,500",
    paymentNote: "Once off",
    features: [
      "1-5 Webpages",
      "1 Domain Name (.COM, .ORG or .NET)",
      "2 Mailboxes",
      "1 Free Month Web Host",
      "WhatsApp Chatbot",
      "Contact Form",
      "Social Media Integration",
      "SSL Certificate (1 Year)"
    ],
    highlight: false,
    cta: "Get a Quote"
  },
  {
    id: "lite",
    name: "Lite Package",
    price: "N$ 3,500",
    paymentNote: "or N$583 x 6 months",
    features: [
      "5-10 Webpages",
      "1 Domain Name (.COM.NA)",
      "3 Mailboxes",
      "1 Free Month Web Host",
      "Admin Dashboard",
      "Database Setup",
      "Online Booking System",
      "SEO & Google Maps Integration",
      "SSL Certificate (1 Year)"
    ],
    highlight: true,
    cta: "Get a Quote"
  },
  {
    id: "premium",
    name: "Premium Package",
    price: "N$ 5,500",
    paymentNote: "or N$917 x 6 months",
    features: [
      "15-20 Webpages",
      "1 Domain Name (.COM.NA)",
      "5 Mailboxes",
      "1 Free Month Web Host",
      "Admin Dashboard + SQL Database",
      "SEO Optimization",
      "E-Commerce Features",
      "1 Month Free Content Updates",
      "SSL Certificate (1 Year)"
    ],
    highlight: false,
    cta: "Get a Quote"
  },
  {
    id: "biz",
    name: "Biz Package",
    price: "N$ 9,250",
    paymentNote: "or N$1,156 x 8 months",
    features: [
      "20+ Webpages",
      "1 Domain Name (.COM.NA)",
      "10 Mailboxes",
      "1 Free Month Web Host",
      "Frontend + Backend Dashboard",
      "24/7 Online Chat System",
      "E-Commerce Features",
      "SEO & Google Maps Integration",
      "2 Months Content Updates",
      "SSL Certificate (1 Year)"
    ],
    highlight: false,
    cta: "Get a Quote"
  }
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discover",
    timeframe: "Day 1 – 2",
    description: "We deeply understand your business, goals, competitors, and audience before anything is designed."
  },
  {
    step: "02",
    title: "Plan",
    timeframe: "Day 3 – 5",
    description: "Site architecture, design direction, and wireframes are agreed upon before development starts."
  },
  {
    step: "03",
    title: "Build",
    timeframe: "Day 5 – 12",
    description: "Clean, fast, responsive code with regular check-ins. You see progress as it happens."
  },
  {
    step: "04",
    title: "Launch",
    timeframe: "Day 13 – 14",
    description: "Thorough testing, deployment, training, and handover — plus 30 days post-launch support."
  }
];

export const WHY_US_COMPARISON = {
  title: "DIY vs VisionTech.",
  subtitle: "See why hiring professionals pays for itself — in time saved, revenue gained, and headaches avoided.",
  withoutUs: {
    title: "DIY / Cheap Templates",
    points: [
      "Generic, cookie-cutter design",
      "Slow load times (3-8 seconds)",
      "Zero SEO — invisible to Google",
      "No mobile optimization",
      "Security vulnerabilities",
      "Weeks of your time wasted",
      "No support when things break"
    ]
  },
  withUs: {
    title: "Professional & Custom",
    points: [
      "Unique, brand-aligned design",
      "Sub-2 second load times",
      "Full SEO optimization included",
      "Pixel-perfect on every device",
      "Enterprise-grade security",
      "Done for you in 7-14 days",
      "30+ days post-launch support"
    ]
  }
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Founder & Lead Developer",
    company: "VisionTech Namibia",
    period: "2023 - Present",
    location: "Windhoek, Namibia",
    description: [
      "Founded VisionTech in 2023 to bring modern, high-performance web development and clean design to Namibian businesses.",
      "Engineered and deployed 10 functional website and web application builds across e-commerce, commercial, and service sectors.",
      "Specializing in modern React, Vue.js, TypeScript, Tailwind CSS, sub-second load times, and mobile responsiveness."
    ],
    technologies: ["React", "Vue.js", "TypeScript", "TailwindCSS", "Node.js", "Netlify"]
  }
];

export const TIMELINE_JOURNEY: { year: string; title: string; desc: string }[] = [];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Johannes Shikongo",
    role: "Operations Manager",
    company: "SwiftHaul Logistics",
    avatar: '/images/trevor.png',
    content: "VisionTech built us a full logistics platform covering all 14 regions. Our quote requests doubled and dispatch runs so much smoother now.",
    rating: 5,
    projectRef: "SwiftHaul Logistics"
  },
  {
    id: "test-2",
    clientName: "Ndapewa Amutenya",
    role: "Admissions Head",
    company: "Elite Private School",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    content: "The team delivered an enrollment system and parent portal that actually works for our staff and families. Admissions season has never been easier.",
    rating: 5,
    projectRef: "Elite Private School"
  },
  {
    id: "test-3",
    clientName: "Ruben Kambonde",
    role: "Owner",
    company: "Savanna Restaurant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "Our reservation system and menu page look stunning and just work. Table bookings through the site have become our biggest source of new guests.",
    rating: 5,
    projectRef: "Savanna Restaurant"
  }
];

export const FAQS_DATA = [
  {
    q: "How long does it take to build a website?",
    a: "Most business websites are completed in 7–14 days, depending on complexity and how quickly content and feedback are provided. E-commerce and custom builds typically take 3–5 weeks."
  },
  {
    q: "Do I need to supply content or do you write it?",
    a: "We can work with content you provide, or our team can write professional, SEO-optimized copy tailored to your industry and brand message."
  },
  {
    q: "Will I be able to update my website myself?",
    a: "Yes! We build user-friendly content management systems and admin dashboards, and we provide full training and documentation so you can easily update text, images, and products."
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes! Our standard structure is 50% upfront and 50% on completion. For larger projects, we also offer flexible 6-month or 8-month installment options (e.g. N$583 x 6 months)."
  },
  {
    q: "What happens after my website launches?",
    a: "All projects include 30 days of free post-launch support and bug fixes. We also offer monthly maintenance, hosting, and backup plans to keep your site running smoothly."
  },
  {
    q: "Can I chat with someone to learn more?",
    a: "Absolutely! You can reach us directly on WhatsApp (+264 81 567 3119), call us, or fill out our contact form to get a response within 2 hours."
  }
];
