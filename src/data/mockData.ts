export interface Degree {
  id: number;
  name: string;
  category: string;
  duration: string;
  description: string;
  eligibility: string[];
  careers: string[];
}

export interface College {
  id: number;
  name: string;
  location: string;
  rating: number;
  fees: string;
  degreesOffered: number[];
  description: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export const degrees: Degree[] = [
  {
    id: 1,
    name: "Bachelor of Computer Science",
    category: "Engineering & Technology",
    duration: "3-4 years",
    description: "A comprehensive program covering programming, algorithms, data structures, and computer architecture. Students learn to solve complex problems using computational principles.",
    eligibility: [
      "PUC with Mathematics as a core subject",
      "Minimum 60% aggregate in PUC",
      "Entrance exam may be required by some colleges"
    ],
    careers: [
      "Software Developer",
      "System Analyst",
      "Database Administrator",
      "Web Developer",
      "AI/Machine Learning Engineer"
    ]
  },
  {
    id: 2,
    name: "Bachelor of Business Administration",
    category: "Business & Management",
    duration: "3 years",
    description: "Focuses on developing management skills, business principles, and entrepreneurial thinking. Students gain insights into marketing, finance, human resources, and operations management.",
    eligibility: [
      "PUC in any stream",
      "Minimum 50% aggregate in PUC",
      "Some colleges conduct their own entrance test"
    ],
    careers: [
      "Business Manager",
      "Marketing Executive",
      "HR Specialist",
      "Entrepreneur",
      "Operations Manager"
    ]
  },
  {
    id: 3,
    name: "Bachelor of Medicine (MBBS)",
    category: "Medical & Health Sciences",
    duration: "5.5 years (including internship)",
    description: "Prepares students for medical practice through extensive study of human anatomy, physiology, pathology, pharmacology, and clinical training.",
    eligibility: [
      "PUC with Biology, Physics, and Chemistry",
      "Minimum 50% aggregate in these subjects",
      "NEET qualification mandatory"
    ],
    careers: [
      "General Physician",
      "Surgeon",
      "Clinical Specialist",
      "Medical Researcher",
      "Public Health Professional"
    ]
  },
  {
    id: 4,
    name: "Bachelor of Arts in Psychology",
    category: "Arts & Humanities",
    duration: "3 years",
    description: "Explores human behavior, cognitive processes, and psychological theories. Students learn research methodologies and counseling techniques.",
    eligibility: [
      "PUC in any stream",
      "Minimum 45-50% aggregate in PUC"
    ],
    careers: [
      "Counselor",
      "Human Resource Specialist",
      "Market Researcher",
      "Social Worker",
      "Educational Counselor"
    ]
  },
  {
    id: 5,
    name: "Bachelor of Science in Physics",
    category: "Science",
    duration: "3 years",
    description: "Focuses on understanding the fundamental laws of nature, from subatomic particles to cosmic phenomena. Students develop strong analytical and problem-solving skills.",
    eligibility: [
      "PUC with Physics and Mathematics",
      "Minimum 55% aggregate in PUC",
      "Some colleges may require entrance exams"
    ],
    careers: [
      "Research Scientist",
      "Data Analyst",
      "Teaching Professional",
      "Lab Technician",
      "Technical Consultant"
    ]
  },
  {
    id: 6,
    name: "Bachelor of Commerce",
    category: "Commerce & Finance",
    duration: "3 years",
    description: "Provides knowledge in accounting, finance, taxation, and business law. Students develop skills in financial analysis and business management.",
    eligibility: [
      "PUC in Commerce/Science stream preferred",
      "Minimum 45-50% aggregate in PUC"
    ],
    careers: [
      "Accountant",
      "Financial Analyst",
      "Tax Consultant",
      "Auditor",
      "Investment Banker"
    ]
  },
  {
    id: 7,
    name: "Bachelor of Technology in Civil Engineering",
    category: "Engineering & Technology",
    duration: "4 years",
    description: "Trains students in the design, construction, and maintenance of infrastructure such as buildings, roads, bridges, and water systems.",
    eligibility: [
      "PUC with Physics, Chemistry, and Mathematics",
      "Minimum 60% aggregate in PCM subjects",
      "JEE Main/State-level entrance exam qualification"
    ],
    careers: [
      "Civil Engineer",
      "Structural Engineer",
      "Construction Manager",
      "Urban Planner",
      "Environmental Engineer"
    ]
  },
  {
    id: 8,
    name: "Bachelor of Arts in Economics",
    category: "Arts & Humanities",
    duration: "3 years",
    description: "Studies economic theories, policies, and their applications. Students develop analytical skills to understand market forces, financial systems, and economic trends.",
    eligibility: [
      "PUC in any stream (Mathematics preferred)",
      "Minimum 50% aggregate in PUC"
    ],
    careers: [
      "Economic Analyst",
      "Policy Researcher",
      "Banking Professional",
      "Finance Consultant",
      "Public Sector Advisor"
    ]
  }
];

export const colleges: College[] = [
  {
    id: 1,
    name: "National Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    fees: "₹80,000 - ₹2,50,000 per year",
    degreesOffered: [1, 7],
    description: "A premier engineering institution known for its excellent faculty and research facilities.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1186&q=80",
    isFeatured: true
  },
  {
    id: 2,
    name: "Indian Institute of Management",
    location: "Ahmedabad, Gujarat",
    rating: 4.9,
    fees: "₹3,00,000 - ₹5,00,000 per year",
    degreesOffered: [2],
    description: "One of the most prestigious business schools in India, known for its rigorous curriculum and industry connections.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    name: "All India Institute of Medical Sciences",
    location: "New Delhi",
    rating: 4.8,
    fees: "₹1,50,000 - ₹4,00,000 per year",
    degreesOffered: [3],
    description: "A leading medical institution known for its cutting-edge research and comprehensive healthcare training.",
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8c6c8f2d45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 4,
    name: "Delhi University",
    location: "Delhi",
    rating: 4.5,
    fees: "₹20,000 - ₹1,00,000 per year",
    degreesOffered: [4, 5, 6, 8],
    description: "A historic university offering a wide range of courses across disciplines with a vibrant campus life.",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    name: "Christ University",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    fees: "₹80,000 - ₹2,00,000 per year",
    degreesOffered: [2, 4, 6, 8],
    description: "Known for its academic excellence and holistic approach to education across various disciplines.",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    isFeatured: true
  },
  {
    id: 6,
    name: "St. Xavier's College",
    location: "Mumbai, Maharashtra",
    rating: 4.6,
    fees: "₹40,000 - ₹1,50,000 per year",
    degreesOffered: [4, 5, 6, 8],
    description: "A renowned institution with a strong focus on liberal arts and sciences, promoting critical thinking and research.",
    imageUrl: "https://images.unsplash.com/photo-1615023991176-2b43665b420a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 7,
    name: "Indian Institute of Science",
    location: "Bangalore, Karnataka",
    rating: 4.9,
    fees: "₹50,000 - ₹2,00,000 per year",
    degreesOffered: [1, 5, 7],
    description: "A premier research institution focusing on advanced scientific and technological research and education.",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isFeatured: true
  },
  {
    id: 8,
    name: "Loyola College",
    location: "Chennai, Tamil Nadu",
    rating: 4.5,
    fees: "₹30,000 - ₹1,00,000 per year",
    degreesOffered: [2, 4, 6, 8],
    description: "A prestigious institution known for its excellence in humanities, sciences, and commerce education.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 9,
    name: "RV College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.6,
    fees: "₹1,00,000 - ₹3,00,000 per year",
    degreesOffered: [1, 7],
    description: "One of the top engineering colleges in Bangalore with strong industry connections and modern infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1186&q=80",
    isFeatured: true
  },
  {
    id: 10,
    name: "PES University",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    fees: "₹1,50,000 - ₹3,50,000 per year",
    degreesOffered: [1, 5, 7],
    description: "A renowned institution focused on providing quality education in engineering, medicine, and management studies.",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isFeatured: true
  },
  {
    id: 11,
    name: "BMS College of Engineering",
    location: "Bangalore, Karnataka",
    rating: 4.5,
    fees: "₹90,000 - ₹2,80,000 per year",
    degreesOffered: [1, 7],
    description: "One of the oldest engineering colleges in Karnataka with strong alumni network and industry partnerships.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    isFeatured: true
  },
  {
    id: 12,
    name: "Mount Carmel College",
    location: "Bangalore, Karnataka",
    rating: 4.3,
    fees: "₹40,000 - ₹1,20,000 per year",
    degreesOffered: [2, 4, 6, 8],
    description: "A premier women's college offering various undergraduate and postgraduate programs in arts, science, and commerce.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 13,
    name: "MS Ramaiah Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.5,
    fees: "₹1,00,000 - ₹3,00,000 per year",
    degreesOffered: [1, 7],
    description: "A top engineering institute known for its cutting-edge research and industry-focused curriculum.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1120&q=80"
  },
  {
    id: 14,
    name: "Bangalore Medical College",
    location: "Bangalore, Karnataka",
    rating: 4.7,
    fees: "₹1,80,000 - ₹5,00,000 per year",
    degreesOffered: [3],
    description: "One of the premier medical colleges in South India with excellent clinical exposure and research opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1631815588090-d1bcbe9a25db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
  },
  {
    id: 15,
    name: "St. Joseph's College",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    fees: "₹30,000 - ₹1,10,000 per year",
    degreesOffered: [4, 5, 6, 8],
    description: "A renowned college offering various undergraduate and postgraduate programs with a focus on holistic development.",
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 16,
    name: "Bangalore Institute of Technology",
    location: "Bangalore, Karnataka",
    rating: 4.3,
    fees: "₹85,000 - ₹2,50,000 per year",
    degreesOffered: [1, 7],
    description: "A well-established engineering institute known for its quality education and placement opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isFeatured: true
  },
  {
    id: 17,
    name: "Ramaiah Institute of Management",
    location: "Bangalore, Karnataka",
    rating: 4.2,
    fees: "₹1,20,000 - ₹2,80,000 per year",
    degreesOffered: [2],
    description: "A premier business school offering quality management education with industry-relevant curriculum.",
    imageUrl: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    isFeatured: true
  },
  {
    id: 18,
    name: "Jain University",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    fees: "₹70,000 - ₹2,20,000 per year",
    degreesOffered: [1, 2, 4, 5, 6, 8],
    description: "A deemed-to-be university offering diverse programs across multiple disciplines with a focus on entrepreneurship.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
    isFeatured: true
  },
  {
    id: 19,
    name: "Reva University",
    location: "Bangalore, Karnataka",
    rating: 4.2,
    fees: "₹80,000 - ₹2,50,000 per year",
    degreesOffered: [1, 2, 5, 7],
    description: "A private university with modern infrastructure and programs designed to meet industry requirements.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1186&q=80",
    isFeatured: true
  },
  {
    id: 20,
    name: "CMR University",
    location: "Bangalore, Karnataka",
    rating: 4.1,
    fees: "₹75,000 - ₹2,30,000 per year",
    degreesOffered: [1, 2, 6, 8],
    description: "An institution known for its industry-focused curriculum and emphasis on practical learning.",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isFeatured: true
  }
];
