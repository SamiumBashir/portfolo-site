/* ==========================================================================
   TECHNICAL DOSSIER // VERIFIED FULL-STACK PROJECTS
   AUTHOR: SAMIUM BASHIR BADHAN
   SELECTION CRITERIA: FULL-STACK ARCHITECTURE (AUTH + BACKEND + FRONTEND)
   ========================================================================== */

export const projects = [
  {
    id: "noir",
    number: "001",
    title: "NOIR Atelier",
    subtitle: "Haute Couture & Architectural Luxury Commerce",
    category: "Full-Stack Luxury E-Commerce",
    filterCategory: "ecommerce",
    image: "./Image/noir.jpg",
    description: "An editorial haute couture e-commerce platform built with Next.js 15, React 19, TypeScript, MongoDB (Mongoose), Redis (ioredis), BullMQ background queues, JWT & bcryptjs authentication, Nodemailer, Cloudinary media CDN, and GSAP ScrollTrigger.",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Mongoose",
      "Redis",
      "BullMQ",
      "JWT Auth",
      "BcryptJS",
      "Cloudinary",
      "Nodemailer",
      "GSAP",
      "Framer Motion",
      "Zod"
    ],
    role: "Full-Stack Engineering & E-Commerce System Architecture",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://noir-ecommerce-lyart.vercel.app",
    repo: "https://github.com/SamiumBashir/noirEcommerce",
    highlight: "Cinematic editorial architecture with Redis/BullMQ background queues, JWT session guards, Nodemailer transactional alerts, and Cloudinary media.",
    caseStudy: {
      overview: "NOIR Atelier is an architectural luxury garment and haute couture e-commerce ecosystem designed to blend high-fashion editorial design with enterprise-grade backend reliability and asynchronous queue processing.",
      problem: "High-end fashion platforms require fluid cinematic visuals without compromising transactional integrity, image load speed, or background processing of purchase notifications.",
      solution: "Engineered an end-to-end full-stack Next.js 15 App Router architecture with React 19, TypeScript, and MongoDB. Implemented Redis with BullMQ for asynchronous order processing and transactional emails via Nodemailer, Cloudinary for responsive image delivery, and JWT auth with HttpOnly cookies.",
      keyFeatures: [
        "Next.js 15 App Router with React 19 Server Actions & Client Components",
        "JWT Authentication & BcryptJS password hashing with secure HTTP-only cookie storage",
        "BullMQ and Redis (ioredis) background queue for order receipt and notification processing",
        "Transactional email engine powered by Nodemailer for verified receipts",
        "Cloudinary signed media CDN pipeline for haute couture imagery",
        "Cinematic GSAP ScrollTrigger & Lenis smooth scrolling interface",
        "Zod runtime validation on order forms and API endpoints"
      ],
      authArchitecture: "JWT authentication with bcryptjs hashing, HttpOnly secure cookies, role-based route guards, and CSRF protection.",
      backendArchitecture: "Next.js API route handlers, Mongoose ODM with indexed schemas, Redis for caching, BullMQ for job orchestration, and Nodemailer integration.",
      frontendArchitecture: "React 19, TypeScript, Tailwind CSS, GSAP ScrollTrigger, Framer Motion, and Zod form validation."
    }
  },
  {
    id: "medicalmanagement",
    number: "002",
    title: "Apex Diagnostics",
    subtitle: "Diagnostic Center & Healthcare Management System",
    category: "Full-Stack Healthcare & Clinical Diagnostic System",
    filterCategory: "healthcare",
    image: "./Image/medicalmanagement.jpg",
    description: "A mission-critical medical diagnostics and patient management platform built with Next.js 15+, React 19, TypeScript, Mongoose/MongoDB, Jose & JWT multi-role RBAC, Radix UI primitives, Recharts analytics, and Docker containerization.",
    stack: [
      "Next.js 15+",
      "React 19",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Jose JWT",
      "BcryptJS",
      "RBAC Security",
      "Radix UI",
      "Recharts",
      "GSAP",
      "Docker",
      "Zod",
      "Sonner"
    ],
    role: "Full-Stack Healthcare Systems Architecture",
    year: "2026",
    status: "PRODUCTION ARCHITECTURE",
    live: "https://github.com/SamiumBashir/medicalmanagement",
    repo: "https://github.com/SamiumBashir/medicalmanagement",
    highlight: "Multi-role RBAC security (Admin, Doctor, Staff, Patient), diagnostic report lifecycle, dynamic QR validation, and containerized Docker architecture.",
    caseStudy: {
      overview: "Apex Diagnostics is a specialized healthcare management platform handling medical test bookings, patient pathology reports, real-time diagnostic telemetry, and multi-tier access control for clinical operations.",
      problem: "Clinical facilities struggle with paper-heavy diagnostic pipelines, fragmented role permissions between receptionists, doctors, and lab technicians, and patient data confidentiality risks.",
      solution: "Constructed a modular full-stack clinical platform utilizing Next.js 15 and React 19 with strict TypeScript typing, Jose/JWT authentication enforcing RBAC across 4 distinct roles, QR-verifiable lab report delivery, and interactive Recharts diagnostic trends.",
      keyFeatures: [
        "Comprehensive 4-tier Role-Based Access Control (Admin, Doctor, Staff, Patient)",
        "Diagnostic test catalog, sample tracking, and digital pathology report workflow",
        "Cryptographic Jose JWT authentication with secure session handling",
        "Dynamic QR code generator for patient report authenticity verification",
        "Recharts analytical dashboards for clinical revenue and test metrics",
        "Radix UI accessible primitives with GSAP micro-animations",
        "Docker & Docker Compose containerized environment for high portability"
      ],
      authArchitecture: "Cryptographic Jose JWT & bcryptjs password hashing with multi-role RBAC guards restricting doctor records, receptionist intakes, and patient reports.",
      backendArchitecture: "Next.js Server API routes, Mongoose models with aggregation queries, QR Code verification stamping, and Docker container orchestration.",
      frontendArchitecture: "React 19, TypeScript, Radix UI primitives, Recharts visualization engine, and Sonner notifications."
    }
  },
  {
    id: "readnest",
    number: "003",
    title: "ReadNest",
    subtitle: "Online Book Borrowing & Community Circulation Platform",
    category: "Full-Stack Library & Circulation Platform",
    filterCategory: "portal",
    image: "./Image/readnest.jpg",
    description: "A modern library borrowing platform built with Next.js 16, React 19, TypeScript, MongoDB native driver, Better-Auth authentication, Tailwind CSS v4, DaisyUI, and Zod validation.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Better-Auth",
      "MongoDB",
      "DaisyUI",
      "Swiper",
      "Zod",
      "React Hook Form",
      "Sonner",
      "Lucide Icons"
    ],
    role: "Full-Stack Architecture & Auth Engineering",
    year: "2026",
    status: "ACTIVE // REPO & PREVIEW",
    live: "https://github.com/SamiumBashir/readNext",
    repo: "https://github.com/SamiumBashir/readNext",
    highlight: "Integrated Better-Auth session architecture, transactional borrowing & return lifecycle, and Tailwind CSS v4.",
    caseStudy: {
      overview: "ReadNest modernizes library book discovery, borrowing workflows, and member management into a responsive, friction-free web platform.",
      problem: "Traditional library systems lack modern authentication methods, mobile-friendly catalog browsing, and real-time inventory reservation safeguards.",
      solution: "Engineered with Next.js 16 App Router and React 19 using Better-Auth for resilient session management, MongoDB for high-throughput inventory queries, and React Hook Form with Zod for foolproof borrowing reservations.",
      keyFeatures: [
        "Modern Better-Auth integration with session revocation and secure credential hashing",
        "Transactional book borrow/return status tracking and due-date alerts",
        "Next.js 16 Server Actions and API route handlers",
        "Interactive book carousels powered by Swiper and DaisyUI components",
        "Dynamic catalog search, genre taxonomy filtering, and review submissions",
        "Tailwind CSS v4 modern engine with zero runtime overhead"
      ],
      authArchitecture: "Better-Auth complete auth ecosystem supporting credentials, OAuth providers, secure session persistence, and instant token revocation.",
      backendArchitecture: "Next.js 16 Server Actions, MongoDB native driver with transactional concurrency checks preventing double-borrowing.",
      frontendArchitecture: "React 19, TypeScript, Tailwind CSS v4, DaisyUI, Swiper carousel, and React Hook Form with Zod."
    }
  },
  {
    id: "phulkini",
    number: "004",
    title: "PhulKini (ফুল কিনি)",
    subtitle: "Floral E-Commerce & SSLCOMMERZ Payment Ecosystem",
    category: "Full-Stack Floral E-Commerce",
    filterCategory: "ecommerce",
    image: "./Image/phulkini.png",
    description: "A next-generation full-stack floral e-commerce platform built with Next.js 15 App Router, React 19, MongoDB Atlas, Redis caching, Jose JWT authentication, Zod validation, and SSLCOMMERZ gateway integration.",
    stack: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "MongoDB Atlas",
      "Mongoose",
      "Redis",
      "Jose JWT",
      "BcryptJS",
      "Zod",
      "SSLCOMMERZ",
      "Cloudinary",
      "Lucide Icons",
      "Canvas Confetti"
    ],
    role: "Full-Stack Engineering & Payment Architecture",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://phul-kini.vercel.app/",
    repo: "https://github.com/SamiumBashir/phulKini",
    highlight: "Full-stack Next.js 15 App Router with Redis rate-limiting, SSLCOMMERZ checkout, Cloudinary media, and Jose JWT security.",
    caseStudy: {
      overview: "PhulKini is a modern full-stack floral boutique commerce ecosystem engineered with Next.js 15 App Router and React 19. It combines lightning-fast server rendering with MongoDB Atlas, Redis rate-limiting, SSLCOMMERZ payment processing, and Cloudinary media optimization.",
      problem: "E-commerce floral shops frequently struggle with slow image rendering, cart drop-offs, security vulnerabilities during checkout, and rate-limiting abuse.",
      solution: "Architected an end-to-end Next.js 15 App Router application featuring Jose JWT auth with HttpOnly secure cookies, Zod schema validation, Redis caching/rate-limiting, Cloudinary signed image uploads, and integrated SSLCOMMERZ payment callbacks.",
      keyFeatures: [
        "Next.js 15 App Router & React 19 Server/Client Component Architecture",
        "SSLCOMMERZ Payment Gateway integration with sandbox and live transaction support",
        "MongoDB Atlas & Mongoose ODM with indexed product queries and order schemas",
        "Redis (ioredis) caching & rate-limiting with seamless in-memory fallback",
        "Jose JWT authentication with BcryptJS hashing & HttpOnly secure cookies",
        "Zod runtime validation for all API routes and checkout payloads",
        "Cloudinary signed uploads for high-resolution floral media optimization",
        "Tailwind CSS UI with Lucide Icons and celebratory Canvas Confetti on orders"
      ],
      authArchitecture: "Jose JWT authentication with BcryptJS hashing, HttpOnly secure cookies, middleware route protection, and token expiration refreshes.",
      backendArchitecture: "Next.js 15 App Router with server-side Zod validation pipelines, Redis rate-limiting middleware, and SSLCOMMERZ IPN/callback handlers.",
      frontendArchitecture: "React 19, Next.js 15, Tailwind CSS, Lucide Icons, and Canvas Confetti."
    }
  },
  {
    id: "cmhs",
    number: "005",
    title: "CMHS Portal",
    subtitle: "Institutional School Management & Academic Hub",
    category: "Full-Stack Educational Platform",
    filterCategory: "portal",
    image: "./Image/cmhs.png",
    description: "A full-stack institutional school management platform engineered with React 19, Express, MongoDB, Redis caching, JWT authentication, and containerized Docker deployment.",
    stack: [
      "React 19",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "JWT Auth",
      "Docker",
      "Docker Compose",
      "Nginx"
    ],
    role: "Full-Stack Engineering & System Architecture",
    year: "2025",
    status: "DEPLOYED // PRODUCTION",
    live: "https://cmhs-nine.vercel.app/",
    repo: "https://github.com/SamiumBashir/cmhs",
    highlight: "Containerized full-stack architecture with Redis caching, JWT auth, and React 19 interactive dashboards.",
    caseStudy: {
      overview: "CMHS is a full-stack institutional portal engineered for academic management, serving faculty, students, and administration with high security and sub-millisecond query delivery.",
      problem: "Traditional institutional portals suffer from fragmented authentication, slow database queries on heavy notice traffic, and monolithic deployment hurdles.",
      solution: "Architected a decoupled React 19 frontend powered by Vite and Tailwind CSS, backed by a Node.js/Express REST API with Redis caching, MongoDB persistence, and isolated Docker Compose orchestration.",
      keyFeatures: [
        "React 19 client with Vite HMR and Framer Motion micro-interactions",
        "JWT-secured role-based access control (RBAC) with HttpOnly cookies",
        "Redis in-memory caching layer for lightning-fast academic notice delivery",
        "MongoDB database schemas with Mongoose indexing and aggregation pipelines",
        "Multi-container Docker Compose setup with Nginx reverse proxy and SSL"
      ],
      authArchitecture: "Decoupled JWT access token system with bcryptjs password hashing and role-based portal routing (Student/Teacher/Admin).",
      backendArchitecture: "Node.js and Express REST API, MongoDB Mongoose ODM, Redis caching layer, Docker Compose containerization.",
      frontendArchitecture: "React 19, Vite, React Router DOM, Tailwind CSS, and Framer Motion."
    }
  },
  {
    id: "docpresc",
    number: "006",
    title: "DocPresc",
    subtitle: "Clinical Prescription & Patient Records Portal",
    category: "Full-Stack Healthcare System",
    filterCategory: "healthcare",
    image: "./Image/docpresc.png",
    description: "A full-stack clinical prescription and patient management system built with React 19, TypeScript, Vite, Node.js, Express, MongoDB/Mongoose with in-memory database fallback, JWT authentication, and PDF/QR export.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Lucide Icons",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Zod",
      "JWT Auth",
      "jsPDF",
      "html2canvas",
      "QR Code"
    ],
    role: "Full-Stack TypeScript Architecture",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://doc-presc.vercel.app",
    repo: "https://github.com/SamiumBashir/docPresc",
    highlight: "Full-stack TypeScript clinical platform with in-memory DB fallback, Zod validation, and vector PDF/QR prescription generation.",
    caseStudy: {
      overview: "DocPresc is a full-stack clinical prescription and patient management portal engineered for medical practitioners. It delivers strict type safety from frontend React components to backend Express API controllers, with automated in-memory MongoDB fallback for zero-configuration execution.",
      problem: "Medical software often suffers from complex local database installation prerequisites, runtime validation errors in dosage fields, and clunky printing workflows.",
      solution: "Constructed an end-to-end TypeScript architecture powered by React 19 and Vite on the client, with an Express/Node.js backend featuring dual-mode MongoDB (Atlas/In-Memory fallback), Zod schema validation, JWT auth, and vector PDF/QR code prescription generation.",
      keyFeatures: [
        "React 19 & TypeScript frontend with Vite HMR and Lucide Icons",
        "Node.js & Express.js backend with strict TypeScript interfaces and Zod validation",
        "MongoDB & Mongoose with automated in-memory database fallback for zero-config run",
        "Secure JWT Authentication with role-based clinical access",
        "Client-side high-resolution PDF generation via jsPDF and html2canvas",
        "Dynamic QR Code verification stamp on generated clinical prescriptions",
        "Standardized medication dosage selector with frequency and duration controls"
      ],
      authArchitecture: "Doctor credential authentication via JWT with session validation and encrypted token handling.",
      backendArchitecture: "Node.js Express backend in TypeScript, Mongoose ODM with automated mongodb-memory-server fallback for zero-configuration instant boots.",
      frontendArchitecture: "React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, jsPDF vector renderer."
    }
  },
  {
    id: "pdftomcq",
    number: "007",
    title: "MCQ Extractor & Exam Engine",
    subtitle: "Automated Question Bank Extraction & OCR Engine",
    category: "Full-Stack EdTech & Document Processing",
    filterCategory: "portal",
    image: "./Image/digitool.png",
    description: "An automated document intelligence platform built with Next.js 16, React 19, TypeScript, PDF.js, Tesseract.js OCR, docx, xlsx, and jsPDF export for institutional question bank generation.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "PDF.js",
      "Tesseract.js OCR",
      "Docx",
      "XLSX",
      "jsPDF",
      "Zod",
      "Lucide Icons"
    ],
    role: "Full-Stack Architecture & OCR Pipeline",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://mcq-extractor.vercel.app",
    repo: "https://github.com/SamiumBashir/pdfToMcqExtractor",
    highlight: "Full-stack OCR & vector PDF parsing engine converting raw exams into validated multi-format question banks.",
    caseStudy: {
      overview: "MCQ Extractor is an educational document parsing suite that extracts multiple-choice questions from scanned exams and PDFs into structured databases, Word documents, and Excel spreadsheets.",
      problem: "Educational institutions spend hundreds of administrative hours manually typing questions from past paper PDFs into examination databases.",
      solution: "Engineered an intelligent parsing pipeline using PDF.js and Tesseract.js OCR on Next.js 16 and React 19, capable of parsing questions, options, and answers with client-side editing and export.",
      keyFeatures: [
        "Dual extraction pipeline: native text extraction & Tesseract OCR image fallback",
        "Algorithmic question structure detection and regex tokenizer",
        "In-place question bank editor with instant preview and answer key tagging",
        "Export directly to DOCX, Excel spreadsheets (XLSX), and vector PDFs",
        "Next.js 16 & React 19 full-stack TypeScript architecture"
      ],
      authArchitecture: "Client-side and server-side validation session tokens with rate-limited OCR processing queues.",
      backendArchitecture: "Next.js Server Actions and API endpoints handling heavy document parsing and file exports.",
      frontendArchitecture: "React 19, TypeScript, Tailwind CSS, Lucide Icons, and Canvas Confetti."
    }
  }
];

export const filterCategories = [
  { id: "all", label: "ALL FULL-STACK WORKS" },
  { id: "ecommerce", label: "E-COMMERCE & PAYMENTS" },
  { id: "healthcare", label: "HEALTHCARE & CLINICAL" },
  { id: "portal", label: "PORTALS & ARCHITECTURES" }
];

