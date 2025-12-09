import { useState } from 'react';
import { X, Search, Plus, AlertCircle, Calendar as CalendarIcon, Filter, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { ScrollArea } from './ui/scroll-area';

type Course = {
  code: string;
  name: string;
  credits: number;
  schedule: string;
  timeSlots: string[];
  instructor: string;
  rating?: number;
  seats: number;
  description: string;
  prerequisites?: string;
  isRequired?: boolean;
  priority?: number;
  isTaken?: boolean;
};

// Mark required courses with priority levels
const requiredCourseCodes = {
  'BIO 101': { priority: 1 },
  'BIO 150': { priority: 2 },
  'BIO 201': { priority: 1 },
  'BIO 315': { priority: 1 },
  'BIO 301': { priority: 2 },
  'BIO 330': { priority: 2 },
  'BIO 420': { priority: 3 },
  'BIO 220': { priority: 3 },
  'BIO 340': { priority: 3 },
  'BIO 350': { priority: 3 },
  'CHEM 101': { priority: 1 },
  'CHEM 102': { priority: 1 },
  'CHEM 201': { priority: 1 },
  'CHEM 202': { priority: 2 },
  'MATH 120': { priority: 1 },
  'MATH 201': { priority: 1 },
  'MATH 202': { priority: 2 },
  'MATH 150': { priority: 1 },
  'CS 101': { priority: 2 },
};

// Courses already taken by the student
const takenCourseCodes = [
  'BIO 101',
  'BIO 150',
  'CHEM 101',
  'CHEM 102',
  'MATH 120',
  'MATH 201',
  'CS 101',
];

const courses = {
  biology: [
    {
      code: 'BIO 101',
      name: 'Introduction to Biology',
      credits: 3,
      schedule: 'MWF 9:00-10:00 AM',
      timeSlots: ['M9-10', 'W9-10', 'F9-10'],
      instructor: 'Dr. Smith',
      rating: 4.5,
      seats: 12,
      description: 'Fundamental principles of biology including cell structure, genetics, and evolution.',
      prerequisites: 'None'
    },
    {
      code: 'BIO 101',
      name: 'Introduction to Biology',
      credits: 3,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Dr. Taylor',
      rating: 4.8,
      seats: 18,
      description: 'Fundamental principles of biology including cell structure, genetics, and evolution.',
      prerequisites: 'None'
    },
    {
      code: 'BIO 150',
      name: 'Environmental Biology',
      credits: 3,
      schedule: 'TR 10:00-11:30 AM',
      timeSlots: ['T10-11:30', 'R10-11:30'],
      instructor: 'Dr. Green',
      rating: 4.3,
      seats: 20,
      description: 'Study of ecosystems, biodiversity, and environmental conservation.',
      prerequisites: 'None'
    },
    {
      code: 'BIO 201',
      name: 'Cell Biology',
      credits: 4,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Dr. Johnson',
      rating: 4.2,
      seats: 8,
      description: 'Advanced study of cellular structure, function, and molecular mechanisms.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 201',
      name: 'Cell Biology',
      credits: 4,
      schedule: 'MWF 9:00-10:30 AM',
      timeSlots: ['M9-10:30', 'W9-10:30', 'F9-10:30'],
      instructor: 'Dr. Peterson',
      rating: 4.6,
      seats: 12,
      description: 'Advanced study of cellular structure, function, and molecular mechanisms.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 220',
      name: 'Human Anatomy',
      credits: 4,
      schedule: 'MWF 1:00-2:30 PM',
      timeSlots: ['M13-14:30', 'W13-14:30', 'F13-14:30'],
      instructor: 'Dr. Anderson',
      rating: 4.7,
      seats: 15,
      description: 'Comprehensive study of human body systems and anatomical structures.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 225',
      name: 'Human Physiology',
      credits: 4,
      schedule: 'TR 2:00-3:30 PM',
      timeSlots: ['T14-15:30', 'R14-15:30'],
      instructor: 'Dr. Anderson',
      rating: 4.7,
      seats: 15,
      description: 'Study of body functions and regulatory mechanisms in human systems.',
      prerequisites: 'BIO 220'
    },
    {
      code: 'BIO 301',
      name: 'Molecular Biology',
      credits: 4,
      schedule: 'MW 9:00-10:30 AM',
      timeSlots: ['M9-10:30', 'W9-10:30'],
      instructor: 'Dr. Martinez',
      rating: 3.9,
      seats: 5,
      description: 'Study of biological activity at the molecular level, including DNA replication and gene expression.',
      prerequisites: 'BIO 201'
    },
    {
      code: 'BIO 301',
      name: 'Molecular Biology',
      credits: 4,
      schedule: 'TR 1:00-2:30 PM',
      timeSlots: ['T13-14:30', 'R13-14:30'],
      instructor: 'Dr. Rodriguez',
      rating: 4.4,
      seats: 8,
      description: 'Study of biological activity at the molecular level, including DNA replication and gene expression.',
      prerequisites: 'BIO 201'
    },
    {
      code: 'BIO 315',
      name: 'Genetics',
      credits: 4,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Dr. Williams',
      rating: 4.5,
      seats: 15,
      description: 'Principles of inheritance, genetic variation, and molecular genetics.',
      prerequisites: 'BIO 201'
    },
    {
      code: 'BIO 330',
      name: 'Evolution',
      credits: 3,
      schedule: 'MWF 11:00-12:00 PM',
      timeSlots: ['M11-12', 'W11-12', 'F11-12'],
      instructor: 'Dr. Darwin',
      rating: 4.9,
      seats: 18,
      description: 'Mechanisms of evolution, natural selection, and speciation.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 340',
      name: 'Marine Biology',
      credits: 4,
      schedule: 'TR 9:00-10:30 AM',
      timeSlots: ['T9-10:30', 'R9-10:30'],
      instructor: 'Dr. Ocean',
      rating: 4.6,
      seats: 14,
      description: 'Study of marine organisms and their ecosystems.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 340',
      name: 'Marine Biology',
      credits: 4,
      schedule: 'MWF 10:00-11:30 AM',
      timeSlots: ['M10-11:30', 'W10-11:30', 'F10-11:30'],
      instructor: 'Dr. Coral',
      rating: 4.3,
      seats: 10,
      description: 'Study of marine organisms and their ecosystems.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 350',
      name: 'Microbiology',
      credits: 4,
      schedule: 'MWF 2:00-3:30 PM',
      timeSlots: ['M14-15:30', 'W14-15:30', 'F14-15:30'],
      instructor: 'Dr. Lee',
      rating: 4.1,
      seats: 10,
      description: 'Study of microorganisms including bacteria, viruses, fungi, and their roles in health and disease.',
      prerequisites: 'BIO 201'
    },
    {
      code: 'BIO 360',
      name: 'Immunology',
      credits: 3,
      schedule: 'TR 1:00-2:30 PM',
      timeSlots: ['T13-14:30', 'R13-14:30'],
      instructor: 'Dr. White',
      rating: 4.4,
      seats: 12,
      description: 'Study of the immune system and its response to pathogens.',
      prerequisites: 'BIO 201'
    },
    {
      code: 'BIO 405',
      name: 'Neurobiology',
      credits: 4,
      schedule: 'MW 10:00-11:30 AM',
      timeSlots: ['M10-11:30', 'W10-11:30'],
      instructor: 'Dr. Brain',
      rating: 4.7,
      seats: 8,
      description: 'Study of the nervous system, neural circuits, and brain function.',
      prerequisites: 'BIO 301'
    },
    {
      code: 'BIO 420',
      name: 'Ecology',
      credits: 3,
      schedule: 'TR 1:00-2:30 PM',
      timeSlots: ['T13-14:30', 'R13-14:30'],
      instructor: 'Dr. Brown',
      rating: 4.5,
      seats: 20,
      description: 'Interactions between organisms and their environment, including population dynamics and ecosystems.',
      prerequisites: 'BIO 101'
    },
    {
      code: 'BIO 450',
      name: 'Bioinformatics',
      credits: 3,
      schedule: 'MW 3:00-4:30 PM',
      timeSlots: ['M15-16:30', 'W15-16:30'],
      instructor: 'Dr. Data',
      rating: 4.2,
      seats: 10,
      description: 'Application of computational tools to biological data analysis.',
      prerequisites: 'BIO 201 and CS 101'
    },
    {
      code: 'BIO 490',
      name: 'Research Methods in Biology',
      credits: 4,
      schedule: 'F 1:00-5:00 PM',
      timeSlots: ['F13-17'],
      instructor: 'Dr. Research',
      rating: 4.6,
      seats: 6,
      description: 'Laboratory techniques and research design in biological sciences.',
      prerequisites: 'BIO 301 or BIO 315'
    }
  ],
  computerScience: [
    {
      code: 'CS 101',
      name: 'Introduction to Programming',
      credits: 3,
      schedule: 'MWF 10:00-11:00 AM',
      timeSlots: ['M10-11', 'W10-11', 'F10-11'],
      instructor: 'Prof. Anderson',
      rating: 4.7,
      seats: 25,
      description: 'Introduction to programming concepts using Python. No prior experience required.',
      prerequisites: 'None'
    },
    {
      code: 'CS 150',
      name: 'Web Development Fundamentals',
      credits: 3,
      schedule: 'TR 9:00-10:30 AM',
      timeSlots: ['T9-10:30', 'R9-10:30'],
      instructor: 'Prof. Webb',
      rating: 4.5,
      seats: 22,
      description: 'HTML, CSS, JavaScript, and responsive design principles.',
      prerequisites: 'CS 101'
    },
    {
      code: 'CS 201',
      name: 'Object-Oriented Programming',
      credits: 3,
      schedule: 'TR 9:00-10:30 AM',
      timeSlots: ['T9-10:30', 'R9-10:30'],
      instructor: 'Prof. Davis',
      rating: 4.6,
      seats: 18,
      description: 'Advanced programming concepts including classes, inheritance, and polymorphism using Java.',
      prerequisites: 'CS 101'
    },
    {
      code: 'CS 220',
      name: 'Computer Architecture',
      credits: 4,
      schedule: 'MW 11:00-12:30 PM',
      timeSlots: ['M11-12:30', 'W11-12:30'],
      instructor: 'Dr. Hardware',
      rating: 4.4,
      seats: 20,
      description: 'Digital logic, processors, memory systems, and computer organization.',
      prerequisites: 'CS 101'
    },
    {
      code: 'CS 250',
      name: 'Data Structures',
      credits: 4,
      schedule: 'MW 2:00-3:30 PM',
      timeSlots: ['M14-15:30', 'W14-15:30'],
      instructor: 'Prof. Chen',
      rating: 4.3,
      seats: 15,
      description: 'Study of fundamental data structures including arrays, linked lists, trees, and graphs.',
      prerequisites: 'CS 201'
    },
    {
      code: 'CS 270',
      name: 'Discrete Mathematics',
      credits: 3,
      schedule: 'TR 2:00-3:30 PM',
      timeSlots: ['T14-15:30', 'R14-15:30'],
      instructor: 'Dr. Math',
      rating: 4.5,
      seats: 16,
      description: 'Logic, set theory, graph theory, and combinatorics for computer science.',
      prerequisites: 'CS 101'
    },
    {
      code: 'CS 310',
      name: 'Algorithms',
      credits: 4,
      schedule: 'TR 10:00-11:30 AM',
      timeSlots: ['T10-11:30', 'R10-11:30'],
      instructor: 'Dr. Thompson',
      rating: 4.6,
      seats: 12,
      description: 'Design and analysis of algorithms, including sorting, searching, and graph algorithms.',
      prerequisites: 'CS 250 and CS 270'
    },
    {
      code: 'CS 320',
      name: 'Operating Systems',
      credits: 4,
      schedule: 'MW 1:00-2:30 PM',
      timeSlots: ['M13-14:30', 'W13-14:30'],
      instructor: 'Dr. Kernel',
      rating: 4.4,
      seats: 14,
      description: 'Process management, memory management, file systems, and system security.',
      prerequisites: 'CS 250'
    },
    {
      code: 'CS 340',
      name: 'Database Systems',
      credits: 3,
      schedule: 'MW 1:00-2:30 PM',
      timeSlots: ['M13-14:30', 'W13-14:30'],
      instructor: 'Prof. Rodriguez',
      rating: 4.5,
      seats: 20,
      description: 'Principles of database design, SQL, normalization, and transaction management.',
      prerequisites: 'CS 250'
    },
    {
      code: 'CS 360',
      name: 'Computer Networks',
      credits: 3,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Dr. Network',
      rating: 4.3,
      seats: 18,
      description: 'Network protocols, TCP/IP, routing, and network security.',
      prerequisites: 'CS 250'
    },
    {
      code: 'CS 370',
      name: 'Mobile App Development',
      credits: 3,
      schedule: 'MW 3:00-4:30 PM',
      timeSlots: ['M15-16:30', 'W15-16:30'],
      instructor: 'Prof. Mobile',
      rating: 4.4,
      seats: 15,
      description: 'iOS and Android development using modern frameworks.',
      prerequisites: 'CS 201'
    },
    {
      code: 'CS 410',
      name: 'Software Engineering',
      credits: 3,
      schedule: 'MWF 3:00-4:00 PM',
      timeSlots: ['M15-16', 'W15-16', 'F15-16'],
      instructor: 'Prof. Wilson',
      rating: 4.5,
      seats: 16,
      description: 'Software development lifecycle, project management, testing, and team collaboration.',
      prerequisites: 'CS 250'
    },
    {
      code: 'CS 450',
      name: 'Artificial Intelligence',
      credits: 4,
      schedule: 'TR 2:00-3:30 PM',
      timeSlots: ['T14-15:30', 'R14-15:30'],
      instructor: 'Dr. Park',
      rating: 4.6,
      seats: 8,
      description: 'Introduction to AI concepts including machine learning, neural networks, and natural language processing.',
      prerequisites: 'CS 310'
    },
    {
      code: 'CS 460',
      name: 'Cybersecurity',
      credits: 3,
      schedule: 'MW 10:00-11:30 AM',
      timeSlots: ['M10-11:30', 'W10-11:30'],
      instructor: 'Dr. Secure',
      rating: 4.4,
      seats: 12,
      description: 'Network security, cryptography, and ethical hacking.',
      prerequisites: 'CS 250 and CS 360'
    },
    {
      code: 'CS 490',
      name: 'Senior Capstone Project',
      credits: 4,
      schedule: 'F 2:00-6:00 PM',
      timeSlots: ['F14-18'],
      instructor: 'Prof. Project',
      rating: 4.7,
      seats: 10,
      description: 'Team-based software development project integrating CS concepts.',
      prerequisites: 'CS 310 and CS 410'
    }
  ],
  mathematics: [
    {
      code: 'MATH 101',
      name: 'College Algebra',
      credits: 3,
      schedule: 'MWF 8:00-9:00 AM',
      timeSlots: ['M8-9', 'W8-9', 'F8-9'],
      instructor: 'Prof. Numbers',
      rating: 4.5,
      seats: 30,
      description: 'Fundamental algebraic concepts, equations, functions, and graphing.',
      prerequisites: 'None'
    },
    {
      code: 'MATH 120',
      name: 'Precalculus',
      credits: 4,
      schedule: 'MWF 9:00-10:30 AM',
      timeSlots: ['M9-10:30', 'W9-10:30', 'F9-10:30'],
      instructor: 'Dr. Calculus',
      rating: 4.6,
      seats: 28,
      description: 'Preparation for calculus including functions, trigonometry, and analytical geometry.',
      prerequisites: 'MATH 101'
    },
    {
      code: 'MATH 150',
      name: 'Statistics I',
      credits: 3,
      schedule: 'TR 10:00-11:30 AM',
      timeSlots: ['T10-11:30', 'R10-11:30'],
      instructor: 'Prof. Stats',
      rating: 4.4,
      seats: 25,
      description: 'Introduction to descriptive statistics, probability, and statistical inference.',
      prerequisites: 'MATH 101'
    },
    {
      code: 'MATH 201',
      name: 'Calculus I',
      credits: 4,
      schedule: 'MWF 10:00-11:30 AM',
      timeSlots: ['M10-11:30', 'W10-11:30', 'F10-11:30'],
      instructor: 'Dr. Newton',
      rating: 4.7,
      seats: 22,
      description: 'Limits, derivatives, applications of derivatives, and introduction to integration.',
      prerequisites: 'MATH 120'
    },
    {
      code: 'MATH 202',
      name: 'Calculus II',
      credits: 4,
      schedule: 'MWF 1:00-2:30 PM',
      timeSlots: ['M13-14:30', 'W13-14:30', 'F13-14:30'],
      instructor: 'Dr. Leibniz',
      rating: 4.5,
      seats: 20,
      description: 'Techniques of integration, applications of integration, and infinite series.',
      prerequisites: 'MATH 201'
    },
    {
      code: 'MATH 203',
      name: 'Calculus III',
      credits: 4,
      schedule: 'TR 1:00-2:30 PM',
      timeSlots: ['T13-14:30', 'R13-14:30'],
      instructor: 'Dr. Vector',
      rating: 4.4,
      seats: 18,
      description: 'Multivariable calculus including partial derivatives and multiple integrals.',
      prerequisites: 'MATH 202'
    },
    {
      code: 'MATH 210',
      name: 'Linear Algebra',
      credits: 3,
      schedule: 'TR 9:00-10:30 AM',
      timeSlots: ['T9-10:30', 'R9-10:30'],
      instructor: 'Prof. Matrix',
      rating: 4.3,
      seats: 20,
      description: 'Vector spaces, linear transformations, matrices, eigenvalues, and eigenvectors.',
      prerequisites: 'MATH 201'
    },
    {
      code: 'MATH 250',
      name: 'Discrete Mathematics',
      credits: 3,
      schedule: 'MWF 11:00-12:00 PM',
      timeSlots: ['M11-12', 'W11-12', 'F11-12'],
      instructor: 'Dr. Logic',
      rating: 4.5,
      seats: 22,
      description: 'Logic, sets, relations, functions, combinatorics, and graph theory.',
      prerequisites: 'MATH 120'
    },
    {
      code: 'MATH 301',
      name: 'Differential Equations',
      credits: 4,
      schedule: 'MW 2:00-3:30 PM',
      timeSlots: ['M14-15:30', 'W14-15:30'],
      instructor: 'Dr. Euler',
      rating: 4.4,
      seats: 16,
      description: 'First and higher-order differential equations and their applications.',
      prerequisites: 'MATH 202'
    },
    {
      code: 'MATH 310',
      name: 'Real Analysis',
      credits: 4,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Dr. Riemann',
      rating: 4.6,
      seats: 12,
      description: 'Rigorous treatment of limits, continuity, differentiation, and integration.',
      prerequisites: 'MATH 203'
    },
    {
      code: 'MATH 320',
      name: 'Abstract Algebra',
      credits: 4,
      schedule: 'MW 11:00-12:30 PM',
      timeSlots: ['M11-12:30', 'W11-12:30'],
      instructor: 'Prof. Group',
      rating: 4.5,
      seats: 14,
      description: 'Groups, rings, fields, and their applications.',
      prerequisites: 'MATH 210'
    },
    {
      code: 'MATH 350',
      name: 'Probability Theory',
      credits: 3,
      schedule: 'TR 2:00-3:30 PM',
      timeSlots: ['T14-15:30', 'R14-15:30'],
      instructor: 'Dr. Random',
      rating: 4.4,
      seats: 18,
      description: 'Probability spaces, random variables, and probability distributions.',
      prerequisites: 'MATH 202'
    },
    {
      code: 'MATH 360',
      name: 'Number Theory',
      credits: 3,
      schedule: 'MWF 2:00-3:00 PM',
      timeSlots: ['M14-15', 'W14-15', 'F14-15'],
      instructor: 'Prof. Prime',
      rating: 4.3,
      seats: 15,
      description: 'Properties of integers, divisibility, congruences, and cryptographic applications.',
      prerequisites: 'MATH 250'
    },
    {
      code: 'MATH 410',
      name: 'Topology',
      credits: 4,
      schedule: 'MW 3:00-4:30 PM',
      timeSlots: ['M15-16:30', 'W15-16:30'],
      instructor: 'Dr. Space',
      rating: 4.5,
      seats: 10,
      description: 'Topological spaces, continuity, compactness, and connectedness.',
      prerequisites: 'MATH 310'
    },
    {
      code: 'MATH 450',
      name: 'Mathematical Modeling',
      credits: 3,
      schedule: 'TR 3:00-4:30 PM',
      timeSlots: ['T15-16:30', 'R15-16:30'],
      instructor: 'Prof. Model',
      rating: 4.4,
      seats: 12,
      description: 'Application of mathematics to real-world problems in science and engineering.',
      prerequisites: 'MATH 301 and MATH 350'
    }
  ],
  chemistry: [
    {
      code: 'CHEM 101',
      name: 'General Chemistry I',
      credits: 4,
      schedule: 'MWF 8:00-9:30 AM',
      timeSlots: ['M8-9:30', 'W8-9:30', 'F8-9:30'],
      instructor: 'Dr. Beaker',
      rating: 4.6,
      seats: 24,
      description: 'Fundamental principles of chemistry including atomic structure, bonding, and stoichiometry.',
      prerequisites: 'None'
    },
    {
      code: 'CHEM 102',
      name: 'General Chemistry II',
      credits: 4,
      schedule: 'MWF 10:00-11:30 AM',
      timeSlots: ['M10-11:30', 'W10-11:30', 'F10-11:30'],
      instructor: 'Dr. Beaker',
      rating: 4.5,
      seats: 22,
      description: 'Continuation of General Chemistry I: thermodynamics, kinetics, and equilibrium.',
      prerequisites: 'CHEM 101'
    },
    {
      code: 'CHEM 201',
      name: 'Organic Chemistry I',
      credits: 4,
      schedule: 'TR 9:00-10:30 AM',
      timeSlots: ['T9-10:30', 'R9-10:30'],
      instructor: 'Prof. Carbon',
      rating: 4.4,
      seats: 20,
      description: 'Structure, properties, and reactions of organic compounds.',
      prerequisites: 'CHEM 102'
    },
    {
      code: 'CHEM 202',
      name: 'Organic Chemistry II',
      credits: 4,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Prof. Carbon',
      rating: 4.3,
      seats: 18,
      description: 'Advanced organic reactions, synthesis, and spectroscopy.',
      prerequisites: 'CHEM 201'
    },
    {
      code: 'CHEM 210',
      name: 'Analytical Chemistry',
      credits: 4,
      schedule: 'MW 1:00-2:30 PM',
      timeSlots: ['M13-14:30', 'W13-14:30'],
      instructor: 'Dr. Analysis',
      rating: 4.5,
      seats: 16,
      description: 'Principles and techniques of chemical analysis and instrumentation.',
      prerequisites: 'CHEM 102'
    },
    {
      code: 'CHEM 220',
      name: 'Inorganic Chemistry',
      credits: 3,
      schedule: 'MWF 1:00-2:00 PM',
      timeSlots: ['M13-14', 'W13-14', 'F13-14'],
      instructor: 'Prof. Element',
      rating: 4.4,
      seats: 18,
      description: 'Structure, bonding, and reactivity of inorganic compounds.',
      prerequisites: 'CHEM 102'
    },
    {
      code: 'CHEM 301',
      name: 'Physical Chemistry I',
      credits: 4,
      schedule: 'MW 2:00-3:30 PM',
      timeSlots: ['M14-15:30', 'W14-15:30'],
      instructor: 'Dr. Thermo',
      rating: 4.3,
      seats: 15,
      description: 'Thermodynamics and kinetics of chemical systems.',
      prerequisites: 'CHEM 102 and MATH 202'
    },
    {
      code: 'CHEM 302',
      name: 'Physical Chemistry II',
      credits: 4,
      schedule: 'MW 3:00-4:30 PM',
      timeSlots: ['M15-16:30', 'W15-16:30'],
      instructor: 'Dr. Quantum',
      rating: 4.4,
      seats: 14,
      description: 'Quantum mechanics and spectroscopy of molecules.',
      prerequisites: 'CHEM 301'
    },
    {
      code: 'CHEM 310',
      name: 'Biochemistry I',
      credits: 4,
      schedule: 'TR 1:00-2:30 PM',
      timeSlots: ['T13-14:30', 'R13-14:30'],
      instructor: 'Dr. Bio',
      rating: 4.5,
      seats: 20,
      description: 'Structure and function of biological molecules including proteins and enzymes.',
      prerequisites: 'CHEM 201 and BIO 101'
    },
    {
      code: 'CHEM 311',
      name: 'Biochemistry II',
      credits: 4,
      schedule: 'TR 2:00-3:30 PM',
      timeSlots: ['T14-15:30', 'R14-15:30'],
      instructor: 'Dr. Bio',
      rating: 4.4,
      seats: 18,
      description: 'Metabolism, bioenergetics, and molecular biology.',
      prerequisites: 'CHEM 310'
    },
    {
      code: 'CHEM 320',
      name: 'Environmental Chemistry',
      credits: 3,
      schedule: 'MWF 11:00-12:00 PM',
      timeSlots: ['M11-12', 'W11-12', 'F11-12'],
      instructor: 'Prof. Green',
      rating: 4.3,
      seats: 16,
      description: 'Chemical processes in the environment and pollution control.',
      prerequisites: 'CHEM 102'
    },
    {
      code: 'CHEM 330',
      name: 'Medicinal Chemistry',
      credits: 3,
      schedule: 'TR 10:00-11:30 AM',
      timeSlots: ['T10-11:30', 'R10-11:30'],
      instructor: 'Dr. Pharma',
      rating: 4.4,
      seats: 15,
      description: 'Design, synthesis, and mechanism of action of pharmaceutical compounds.',
      prerequisites: 'CHEM 202'
    },
    {
      code: 'CHEM 350',
      name: 'Spectroscopy',
      credits: 3,
      schedule: 'MW 11:00-12:30 PM',
      timeSlots: ['M11-12:30', 'W11-12:30'],
      instructor: 'Prof. Spectrum',
      rating: 4.5,
      seats: 12,
      description: 'NMR, IR, UV-Vis, and mass spectrometry techniques.',
      prerequisites: 'CHEM 202'
    },
    {
      code: 'CHEM 410',
      name: 'Advanced Organic Synthesis',
      credits: 4,
      schedule: 'TR 3:00-4:30 PM',
      timeSlots: ['T15-16:30', 'R15-16:30'],
      instructor: 'Dr. Synthesis',
      rating: 4.4,
      seats: 10,
      description: 'Modern synthetic methods and total synthesis of complex molecules.',
      prerequisites: 'CHEM 202'
    },
    {
      code: 'CHEM 490',
      name: 'Chemistry Research',
      credits: 4,
      schedule: 'F 1:00-5:00 PM',
      timeSlots: ['F13-17'],
      instructor: 'Dr. Lab',
      rating: 4.5,
      seats: 8,
      description: 'Independent research project in chemistry.',
      prerequisites: 'CHEM 301 or CHEM 310'
    }
  ],
  engineering: [
    {
      code: 'ENG 101',
      name: 'Introduction to Engineering',
      credits: 3,
      schedule: 'MWF 9:00-10:00 AM',
      timeSlots: ['M9-10', 'W9-10', 'F9-10'],
      instructor: 'Prof. Builder',
      rating: 4.6,
      seats: 30,
      description: 'Overview of engineering disciplines, problem-solving, and design process.',
      prerequisites: 'None'
    },
    {
      code: 'ENG 120',
      name: 'Engineering Graphics',
      credits: 3,
      schedule: 'TR 8:00-9:30 AM',
      timeSlots: ['T8-9:30', 'R8-9:30'],
      instructor: 'Dr. Draw',
      rating: 4.5,
      seats: 24,
      description: 'Technical drawing, CAD, and visualization of engineering designs.',
      prerequisites: 'None'
    },
    {
      code: 'ENG 201',
      name: 'Statics',
      credits: 3,
      schedule: 'MWF 10:00-11:00 AM',
      timeSlots: ['M10-11', 'W10-11', 'F10-11'],
      instructor: 'Dr. Force',
      rating: 4.4,
      seats: 22,
      description: 'Analysis of forces and moments in equilibrium systems.',
      prerequisites: 'MATH 201'
    },
    {
      code: 'ENG 202',
      name: 'Dynamics',
      credits: 3,
      schedule: 'MWF 11:00-12:00 PM',
      timeSlots: ['M11-12', 'W11-12', 'F11-12'],
      instructor: 'Dr. Motion',
      rating: 4.3,
      seats: 20,
      description: 'Kinematics and kinetics of particles and rigid bodies.',
      prerequisites: 'ENG 201'
    },
    {
      code: 'ENG 210',
      name: 'Circuits I',
      credits: 4,
      schedule: 'TR 9:00-10:30 AM',
      timeSlots: ['T9-10:30', 'R9-10:30'],
      instructor: 'Prof. Volt',
      rating: 4.5,
      seats: 20,
      description: 'DC and AC circuit analysis, Ohm\'s law, and Kirchhoff\'s laws.',
      prerequisites: 'MATH 202'
    },
    {
      code: 'ENG 220',
      name: 'Thermodynamics',
      credits: 3,
      schedule: 'TR 10:00-11:30 AM',
      timeSlots: ['T10-11:30', 'R10-11:30'],
      instructor: 'Dr. Heat',
      rating: 4.4,
      seats: 18,
      description: 'Laws of thermodynamics, heat transfer, and energy systems.',
      prerequisites: 'MATH 201 and CHEM 101'
    },
    {
      code: 'ENG 230',
      name: 'Materials Science',
      credits: 3,
      schedule: 'MWF 1:00-2:00 PM',
      timeSlots: ['M13-14', 'W13-14', 'F13-14'],
      instructor: 'Prof. Material',
      rating: 4.3,
      seats: 20,
      description: 'Structure and properties of engineering materials.',
      prerequisites: 'CHEM 101'
    },
    {
      code: 'ENG 301',
      name: 'Mechanics of Materials',
      credits: 3,
      schedule: 'MW 1:00-2:30 PM',
      timeSlots: ['M13-14:30', 'W13-14:30'],
      instructor: 'Dr. Stress',
      rating: 4.4,
      seats: 18,
      description: 'Stress, strain, and deformation of structural elements.',
      prerequisites: 'ENG 201'
    },
    {
      code: 'ENG 310',
      name: 'Electronics',
      credits: 4,
      schedule: 'TR 1:00-2:30 PM',
      timeSlots: ['T13-14:30', 'R13-14:30'],
      instructor: 'Prof. Electron',
      rating: 4.5,
      seats: 16,
      description: 'Semiconductor devices, amplifiers, and digital electronics.',
      prerequisites: 'ENG 210'
    },
    {
      code: 'ENG 320',
      name: 'Fluid Mechanics',
      credits: 3,
      schedule: 'MWF 2:00-3:00 PM',
      timeSlots: ['M14-15', 'W14-15', 'F14-15'],
      instructor: 'Dr. Flow',
      rating: 4.3,
      seats: 18,
      description: 'Properties and behavior of fluids in motion and at rest.',
      prerequisites: 'ENG 202 and MATH 203'
    },
    {
      code: 'ENG 330',
      name: 'Control Systems',
      credits: 3,
      schedule: 'TR 11:00-12:30 PM',
      timeSlots: ['T11-12:30', 'R11-12:30'],
      instructor: 'Prof. Control',
      rating: 4.4,
      seats: 15,
      description: 'Analysis and design of feedback control systems.',
      prerequisites: 'MATH 301'
    },
    {
      code: 'ENG 340',
      name: 'Signals and Systems',
      credits: 3,
      schedule: 'MW 2:00-3:30 PM',
      timeSlots: ['M14-15:30', 'W14-15:30'],
      instructor: 'Dr. Signal',
      rating: 4.5,
      seats: 16,
      description: 'Analysis of continuous and discrete-time signals and systems.',
      prerequisites: 'MATH 301'
    },
    {
      code: 'ENG 410',
      name: 'Machine Design',
      credits: 4,
      schedule: 'MW 3:00-4:30 PM',
      timeSlots: ['M15-16:30', 'W15-16:30'],
      instructor: 'Prof. Machine',
      rating: 4.4,
      seats: 14,
      description: 'Design of machine elements including gears, bearings, and shafts.',
      prerequisites: 'ENG 301'
    },
    {
      code: 'ENG 420',
      name: 'Power Systems',
      credits: 3,
      schedule: 'TR 2:00-3:30 PM',
      timeSlots: ['T14-15:30', 'R14-15:30'],
      instructor: 'Dr. Power',
      rating: 4.3,
      seats: 12,
      description: 'Generation, transmission, and distribution of electrical power.',
      prerequisites: 'ENG 310'
    },
    {
      code: 'ENG 490',
      name: 'Senior Design Project',
      credits: 4,
      schedule: 'F 1:00-5:00 PM',
      timeSlots: ['F13-17'],
      instructor: 'Prof. Design',
      rating: 4.5,
      seats: 15,
      description: 'Capstone design project integrating engineering principles.',
      prerequisites: 'Senior Standing'
    }
  ]
};

type Major = 'biology' | 'computerScience' | 'mathematics' | 'chemistry' | 'engineering';

interface ClassSearchProps {
  onClose: () => void;
  onRegister: (courses: Course[], semester: string) => void;
  currentSchedule: Course[];
  theme: any;
  isDarkMode?: boolean;
}

export function ClassSearch({ onClose, onRegister, currentSchedule, theme, isDarkMode = false }: ClassSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<Major>('biology');
  const [addedCourses, setAddedCourses] = useState<Course[]>([]);
  const [semester, setSemester] = useState('Spring 2026');
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [courseFilter, setCourseFilter] = useState<'all' | 'required'>('all');

  const currentCourses = courses[selectedMajor];
  const filteredCourses = currentCourses
    .filter(course => {
      const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = courseFilter === 'all' || (courseFilter === 'required' && requiredCourseCodes[course.code as keyof typeof requiredCourseCodes]);
      return matchesSearch && matchesFilter;
    })
    .map(course => ({
      ...course,
      isRequired: !!requiredCourseCodes[course.code as keyof typeof requiredCourseCodes],
      priority: requiredCourseCodes[course.code as keyof typeof requiredCourseCodes]?.priority,
      isTaken: takenCourseCodes.includes(course.code)
    }))
    .sort((a, b) => {
      // Sort by priority if both are required
      if (a.isRequired && b.isRequired) {
        return (a.priority || 99) - (b.priority || 99);
      }
      // Required courses first
      if (a.isRequired && !b.isRequired) return -1;
      if (!a.isRequired && b.isRequired) return 1;
      return 0;
    });

  const checkTimeConflict = (newCourse: Course): string | null => {
    const allCourses = [...currentSchedule, ...addedCourses];
    
    for (const existingCourse of allCourses) {
      for (const newSlot of newCourse.timeSlots) {
        for (const existingSlot of existingCourse.timeSlots) {
          if (newSlot === existingSlot) {
            return `Time conflict with ${existingCourse.code}: ${existingCourse.name}`;
          }
        }
      }
    }
    return null;
  };

  const toggleCourse = (course: Course) => {
    // Can't add courses already taken
    if (takenCourseCodes.includes(course.code)) {
      setConflictWarning('This course has already been taken and cannot be repeated for credit');
      setTimeout(() => setConflictWarning(null), 4000);
      return;
    }

    const isAdded = addedCourses.some(c => c.code === course.code);
    
    if (isAdded) {
      setAddedCourses(addedCourses.filter(c => c.code !== course.code));
      setConflictWarning(null);
    } else {
      const conflict = checkTimeConflict(course);
      if (conflict) {
        setConflictWarning(conflict);
        setTimeout(() => setConflictWarning(null), 4000);
      } else {
        setAddedCourses([...addedCourses, course]);
        setConflictWarning(null);
      }
    }
  };

  const handleRegister = () => {
    onRegister(addedCourses, semester);
    onClose();
  };

  const isAdded = (code: string) => addedCourses.some(c => c.code === code);

  const getMajorColor = (major: Major) => {
    switch (major) {
      case 'biology':
        return { bg: theme.accent1, border: theme.accent1Border, text: theme.primaryText };
      case 'computerScience':
        return { bg: theme.accent2, border: theme.accent2Border, text: `text-${theme.secondary.split('-')[1]}-700` };
      case 'mathematics':
        return { bg: 'from-blue-50 to-indigo-50', border: 'border-blue-300', text: 'text-blue-700' };
      case 'chemistry':
        return { bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-300', text: 'text-emerald-700' };
      case 'engineering':
        return { bg: 'from-orange-50 to-amber-50', border: 'border-orange-300', text: 'text-orange-700' };
    }
  };

  const majorColors = getMajorColor(selectedMajor);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'}`} style={{ maxWidth: '430px', margin: '0 auto' }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.header} text-white p-4 flex-shrink-0`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <h2>Class Search</h2>
            <div className="text-xs opacity-90 mt-1">Register for {semester}</div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Semester Selector */}
        <Select value={semester} onValueChange={setSemester}>
          <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Spring 2026">Spring 2026</SelectItem>
            <SelectItem value="Fall 2025">Fall 2025</SelectItem>
            <SelectItem value="Summer 2026">Summer 2026</SelectItem>
            <SelectItem value="Fall 2026">Fall 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conflict Warning */}
      {conflictWarning && (
        <Alert className="m-4 mb-0 border-red-300 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-xs">
            {conflictWarning}
          </AlertDescription>
        </Alert>
      )}

      {/* Search Bar */}
      <div className="p-4 bg-white border-b flex-shrink-0 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Course Filter */}
        <Select value={courseFilter} onValueChange={(v) => setCourseFilter(v as 'all' | 'required')}>
          <SelectTrigger className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="required">Required for Graduation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Major Tabs */}
      <Tabs value={selectedMajor} onValueChange={(v) => setSelectedMajor(v as Major)} className="flex-1 flex flex-col min-h-0">
        <div className="w-full border-b flex-shrink-0 overflow-x-auto">
          <TabsList className="inline-flex h-auto w-auto min-w-full">
            <TabsTrigger value="biology" className="flex-1 min-w-[80px] whitespace-nowrap px-3">Biology</TabsTrigger>
            <TabsTrigger value="computerScience" className="flex-1 min-w-[80px] whitespace-nowrap px-3">Comp Sci</TabsTrigger>
            <TabsTrigger value="mathematics" className="flex-1 min-w-[80px] whitespace-nowrap px-3">Math</TabsTrigger>
            <TabsTrigger value="chemistry" className="flex-1 min-w-[80px] whitespace-nowrap px-3">Chem</TabsTrigger>
            <TabsTrigger value="engineering" className="flex-1 min-w-[80px] whitespace-nowrap px-3">Engineer</TabsTrigger>
          </TabsList>
        </div>

        {(['biology', 'computerScience', 'mathematics', 'chemistry', 'engineering'] as Major[]).map((major) => (
          <TabsContent key={major} value={major} className="flex-1 min-h-0 mt-0 overflow-auto">
            <div className="p-4 space-y-3">
              {filteredCourses.map((course) => {
                const colors = getMajorColor(major);
                const isPriorityHigh = course.priority === 1;
                const isPriorityMed = course.priority === 2;
                const isPriorityLow = course.priority === 3;
                
                return (
                  <div key={course.code} className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-lg p-4 shadow-sm ${course.isTaken ? 'opacity-70' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 mb-1 flex-wrap">
                          <Badge variant="outline" className={`${colors.border} ${colors.text}`}>{course.code}</Badge>
                          {course.isRequired && course.priority && (
                            <Badge className={`text-xs ${isPriorityHigh ? 'bg-red-100 text-red-700 border-red-300' : isPriorityMed ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
                              Priority {course.priority}
                            </Badge>
                          )}
                          {course.isTaken && (
                            <Badge className="text-xs bg-gray-200 text-gray-700">Already Taken</Badge>
                          )}
                        </div>
                        <div className="text-sm">{course.name}</div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => toggleCourse(course)}
                        variant={isAdded(course.code) ? "default" : "outline"}
                        disabled={course.isTaken}
                        className={course.isTaken ? "opacity-50 cursor-not-allowed" : isAdded(course.code) ? "bg-green-500 hover:bg-green-600" : `${colors.border} ${colors.text}`}
                      >
                        {course.isTaken ? (
                          <>✓ Taken</>
                        ) : isAdded(course.code) ? (
                          <>✓ Added</>
                        ) : (
                          <><Plus className="w-4 h-4 mr-1" /> Add</>
                        )}
                      </Button>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1 mb-2">
                      <div>{course.schedule}</div>
                      <div className="flex items-center gap-2">
                        <span>{course.instructor}</span>
                        {course.rating && (
                          <span className="flex items-center gap-0.5 text-amber-600">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {course.rating.toFixed(1)}
                          </span>
                        )}
                        <span>• {course.credits} credits</span>
                      </div>
                      <div className="text-green-600">{course.seats} seats available</div>
                      {course.prerequisites && (
                        <div className="text-amber-700">
                          Prerequisites: {course.prerequisites}
                        </div>
                      )}
                      {course.isTaken && (
                        <div className="text-red-600">
                          Cannot repeat for additional credit
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 leading-relaxed">
                      {course.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Bottom Action Bar */}
      {addedCourses.length > 0 && (
        <div className="p-4 bg-white border-t shadow-lg flex-shrink-0">
          <Button 
            onClick={handleRegister}
            className={`w-full bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover}`}
          >
            Register for {addedCourses.length} Course{addedCourses.length > 1 ? 's' : ''} - {semester}
          </Button>
        </div>
      )}
    </div>
  );
}