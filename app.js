/* ==========================================================================
   TECHNICAL DOSSIER // APPLICATION ENGINE
   AUTHOR: SAMIUM BASHIR BADHAN
   SYSTEM: GSAP SCROLLTRIGGER & DOSSIER CONTROLLER
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   PROJECT DATA & ENGINEERING CASE STUDIES
   ========================================================================== */
const projects = [
  {
    id: "phulkini",
    number: "001",
    title: "PhulKini",
    subtitle: "Floral E-Commerce & Checkout Ecosystem",
    category: "E-Commerce System",
    type: "app",
    image: "./Image/phulkini.png",
    description: "A modern, high-conversion floral shopping platform featuring responsive catalog filtering, interactive cart state, dynamic pricing, and streamlined checkout.",
    stack: ["JavaScript", "Next js", "HTML5", "CSS3", "DOM Architecture", "Local Storage"],
    role: "Frontend Architecture & UI Engineering",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://phul-kini.vercel.app/",
    repo: "https://github.com/SamiumBashir/phulKini",
    highlight: "Engineered stateful cart mechanics with real-time total computation and zero layout shift.",
    caseStudy: {
      overview: "PhulKini was designed as a bespoke floral commerce showcase, translating artisanal floral design into a clean digital retail experience. The objective was fast page loads, effortless product browsing, and bulletproof cart state management.",
      problem: "Traditional boutique e-commerce sites often suffer from slow image loads, clumsy checkout workflows, and poor mobile touch targets.",
      solution: "Implemented an event-driven DOM architecture in vanilla JavaScript with persistent LocalStorage state. Styled with precision typography and micro-interactions that elevate brand trust.",
      keyFeatures: [
        "Real-time reactive cart drawer with item count and subtotal badges",
        "Category & price sorting with instant DOM re-rendering",
        "Persistent cart session storage across page navigation",
        "Responsive touch-first product grid with lazy-loaded media assets",
        "Form validation on order checkout with clear error states"
      ],
      architectureNotes: "State operations are decoupled from DOM manipulation via helper state controllers, preventing UI/data synchronization bugs."
    }
  },
  {
    id: "cmhs",
    number: "002",
    title: "CMHS Portal",
    subtitle: "Institutional School Management & Academic Hub",
    category: "Full-Stack Educational Platform",
    type: "app",
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
      architectureNotes: "Decoupled client-server architecture with Docker containerization, Redis caching middleware, and Nginx reverse proxy load distribution."
    }
  },
  {
    id: "digitools",
    number: "003",
    title: "DigiTools",
    subtitle: "Digital Utility Suite & Web Workspace",
    category: "React Web Application",
    type: "app",
    image: "./Image/digitool.png",
    description: "A versatile suite of digital productivity tools and calculators built with modern React, modular components, and real-time state manipulation.",
    stack: ["React 19", "Vite", "Tailwind CSS", "DaisyUI", "React Toastify"],
    role: "React Engineering & Component System",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://digi-tools-inky.vercel.app/",
    repo: "https://github.com/SamiumBashir/DigiTools",
    highlight: "Modular component pipeline allowing independent tool extension with shared design tokens.",
    caseStudy: {
      overview: "DigiTools is an extensible toolbox web app aggregating essential digital calculation, formatting, and conversion utilities into a unified interface.",
      problem: "Users frequently switch between disconnected web tools with cluttered ads and inconsistent user experiences.",
      solution: "Created an isolated tool-provider architecture in React 19 where each utility operates as an independent module sharing global theme contexts and notification feeds.",
      keyFeatures: [
        "Multi-utility tool dashboard with instant switching",
        "Complex mathematical and formatting algorithms executed client-side",
        "Toast notification system for user copy/paste and export actions",
        "Strict input validation and sanitized output computation",
        "Keyboard shortcut support for rapid utility workflows"
      ],
      architectureNotes: "Vite build pipeline optimized for sub-100ms hot reload and lightweight tree-shaken bundles."
    }
  },
  {
    id: "job-tracker",
    number: "004",
    title: "Job Tracker",
    subtitle: "Application Pipeline & Lifecycle Dashboard",
    category: "Productivity System",
    type: "app",
    image: "./Image/jat.png",
    description: "A career pipeline interface engineered for managing job applications, interview stages, deadlines, and status tracking with structured metrics.",
    stack: ["JavaScript (ES6+)", "Tailwind CSS", "HTML5", "State Controllers"],
    role: "Full Frontend Design & State Handlers",
    year: "2026",
    status: "DEPLOYED // PRODUCTION",
    live: "https://job-tracker-xi-ashen.vercel.app/",
    repo: "https://github.com/SamiumBashir/Job-Tracker-",
    highlight: "Kanban and list view state synchronization with persistent analytics filtering.",
    caseStudy: {
      overview: "Job Tracker addresses the chaotic job search workflow by providing a structured, distraction-free application management dashboard.",
      problem: "Spreadsheets lack contextual action items and mobile responsiveness when monitoring active hiring pipelines.",
      solution: "Developed an application dashboard with stage counters, date sorting, and interactive status tag toggles built on custom JavaScript state handlers.",
      keyFeatures: [
        "Application lifecycle stages (Applied, Interviewing, Offer, Archive)",
        "Search and filter by company, tech stack, and salary range",
        "Deadline reminders and interview schedule metadata",
        "Export and import pipeline telemetry for data backup",
        "Instant responsive cards with stage-based color coding"
      ],
      architectureNotes: "Built with pure semantic HTML5 and utility CSS, achieving a 100 Lighthouse performance score."
    }
  },
  {
    id: "docpresc",
    number: "005",
    title: "DocPresc",
    subtitle: "Clinical Prescription & Patient Records Portal",
    category: "Healthcare Application",
    type: "app",
    image: "./Image/docpresc.png",
    description: "A digital prescription management platform with strict TypeScript data structures, role-based patient lookup, and streamlined dosage formatting.",
    stack: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    role: "TypeScript Frontend Architecture",
    year: "2026",
    status: "IN DEVELOPMENT // ACTIVE",
    live: "#",
    repo: "https://github.com/SamiumBashir/docPresc",
    highlight: "Type-safe medication catalog with dosage calculation and printable prescription layout.",
    caseStudy: {
      overview: "DocPresc digitizes medical prescriptions for clinical practitioners, eliminating legibility errors and standardizing medication administration records.",
      problem: "Handwritten clinical prescriptions cause dispensing mistakes and record fragmentation across clinics.",
      solution: "Built a type-safe TypeScript web application with strictly defined interfaces for patients, diagnosis codes, and medication dosage intervals.",
      keyFeatures: [
        "Patient directory with historical prescription recall",
        "Standardized medication dosage selector with timing intervals",
        "Print-ready clinical layout with QR verification stamp",
        "Type-checked form fields preventing dosage omissions",
        "Diagnostic note templates for rapid physician drafting"
      ],
      architectureNotes: "Strict TypeScript interfaces ensure zero runtime undefined errors during prescription generation."
    }
  },
  {
    id: "lumina",
    number: "006",
    title: "Lumina Creative",
    subtitle: "Digital Design Agency & Case Studies Portal",
    category: "Creative Agency Showcase",
    type: "multi",
    image: "./Image/lumina.png",
    description: "A multi-page agency website highlighting creative client services, case studies, team portfolios, and interactive client inquiry forms.",
    stack: ["HTML5", "CSS3", "JavaScript", "Multi-Page Architecture"],
    role: "Frontend Development & Multi-Page Routing",
    year: "2025",
    status: "DEPLOYED // PRODUCTION",
    live: "https://lumina-creative-beta.vercel.app/",
    repo: "https://github.com/SamiumBashir/Lumina-Creative",
    highlight: "Sophisticated typography hierarchy and cohesive agency branding across 5 distinct pages.",
    caseStudy: {
      overview: "Lumina Creative serves as the digital front door for a creative agency, showcasing portfolio work, client testimonials, and studio capabilities.",
      problem: "Agency sites often suffer from over-designed widgets that distract from case study readability.",
      solution: "Created a structured editorial design system with high-contrast text, disciplined white space, and modular page layouts.",
      keyFeatures: [
        "Multi-page architecture: Home, Services, Portfolio, About, Contact",
        "Filtered portfolio gallery highlighting branding and UI projects",
        "Interactive consultation scheduler form with input masking",
        "Client testimonial carousel and case study metrics",
        "Fluid typography system adapting seamlessly across screen sizes"
      ],
      architectureNotes: "Strict BEM CSS structure ensuring maintainable and conflict-free style cascades."
    }
  },
  {
    id: "leno",
    number: "007",
    title: "Leno",
    subtitle: "Mobile Application Landing & Conversion Portal",
    category: "Product Landing Page",
    type: "multi",
    image: "./Image/leno.png",
    description: "A conversion-optimized product landing page for a mobile wellness application, featuring feature mockups, video modals, and testimonial tabs.",
    stack: ["HTML5", "CSS3", "JavaScript", "Modal Controllers"],
    role: "Conversion Optimization & Landing Page UI",
    year: "2025",
    status: "DEPLOYED // PRODUCTION",
    live: "https://leno-web-rouge.vercel.app/",
    repo: "https://github.com/SamiumBashir/Leno-",
    highlight: "High-conversion CTA architecture with interactive device mockups and feature accordions.",
    caseStudy: {
      overview: "Leno is a conversion-focused SaaS landing page crafted to drive mobile app installations and subscription signups.",
      problem: "App landing pages frequently have low conversion rates due to unclear value propositions and cluttered visual noise.",
      solution: "Structured the content around clear benefit blocks, interactive device mockups, and customer proof points.",
      keyFeatures: [
        "Interactive app showcase with tabbed feature switching",
        "Embedded video demo modal with backdrop dismiss",
        "Download badge CTAs for iOS App Store and Google Play",
        "FAQ accordion with smooth expansion states",
        "Sticky conversion bar appearing on scroll depth"
      ],
      architectureNotes: "Optimized critical rendering path for sub-1 second first contentful paint."
    }
  },
  {
    id: "abacus",
    number: "008",
    title: "Convention Center",
    subtitle: "Venue Management & Event Booking Showcase",
    category: "Venue Showcase",
    type: "ui",
    image: "./Image/convension_center.png",
    description: "A professional landing page for a premier convention center featuring hall capacity calculators, pricing tiers, and direct booking inquiries.",
    stack: ["HTML5", "Bootstrap 5", "CSS3", "JavaScript"],
    role: "UI Development & Bootstrap 5 Customization",
    year: "2025",
    status: "DEPLOYED // PRODUCTION",
    live: "https://abacus-convention-center.netlify.app/",
    repo: "https://github.com/SamiumBashir/Abacus-Convention-Center",
    highlight: "Responsive hall showcase with seating layout specs and interactive pricing calculators.",
    caseStudy: {
      overview: "A convention center web portal engineered to help event planners inspect hall dimensions, seating capacity, and package pricing.",
      problem: "Event organizers struggle to visualize venue specs without tedious manual inquiries.",
      solution: "Built a categorized hall browser with dimension specs, package tiers, and interactive booking modal inquiry forms.",
      keyFeatures: [
        "Hall gallery with capacity tags and photo sliders",
        "Transparent pricing package comparison matrix",
        "Interactive booking inquiry form with date-picker",
        "Location map and transit guidance integrations",
        "Customer testimonials and event photo archives"
      ],
      architectureNotes: "Customized Bootstrap 5 utility classes paired with bespoke CSS overrides for elevated aesthetics."
    }
  },
  {
    id: "tutor",
    number: "009",
    title: "Tutor Website",
    subtitle: "Education Marketplace & Mentor Directory",
    category: "Education Platform",
    type: "multi",
    image: "./Image/tutor.png",
    description: "An educational marketplace interface connecting students with certified tutors, featuring subject categorization and lesson scheduling.",
    stack: ["HTML5", "CSS3", "JavaScript", "Grid Layout"],
    role: "Frontend Layout & Responsive UI",
    year: "2025",
    status: "DEPLOYED // PRODUCTION",
    live: "https://tw-tutor.netlify.app/",
    repo: "https://github.com/SamiumBashir/Tutor-Website",
    highlight: "Structured mentor catalog with rating badges, subject filters, and course modules.",
    caseStudy: {
      overview: "Tutor Website is an online learning directory designed to streamline student-tutor discovery and course enrollment.",
      problem: "Educational marketplaces often have cluttered search workflows and fragmented course information.",
      solution: "Engineered a card-based mentor directory with clear credential badges, hourly pricing, and instant booking hooks.",
      keyFeatures: [
        "Subject-based tutor filtering (Mathematics, Physics, Coding)",
        "Tutor profile cards with verified badges and rating stars",
        "Course syllabus preview with duration timestamps",
        "Interactive student enrollment modal",
        "Mobile-optimized learning path preview"
      ],
      architectureNotes: "Lightweight vanilla script architecture ensuring instant responsiveness even on slow 3G networks."
    }
  }
];

/* ==========================================================================
   SKILLS MATRIX DATA (TECHNICAL TOOLBOX)
   ========================================================================== */
const skillMatrix = [
  {
    categoryNumber: "01",
    categoryName: "CORE",
    categoryDesc: "Foundational web standards, language specifications, and typing systems.",
    skills: [
      { name: "HTML5", details: "Semantic HTML · Accessibility" },
      { name: "CSS3", details: "Flexbox · Grid · Responsive Design" },
      { name: "JavaScript", details: "ES6+ · Async/Await · DOM · Web APIs" },
      { name: "TypeScript", details: "Types · Interfaces · Generics" }
    ]
  },
  {
    categoryNumber: "02",
    categoryName: "FRONTEND ENGINEERING",
    categoryDesc: "Component architectures, modern frameworks, and UI utility systems.",
    skills: [
      { name: "React", details: "React 19 · Hooks · Component Architecture" },
      { name: "Next.js", details: "App Router · Server/Client Components" },
      { name: "React Router", details: "Dynamic Routing · Layouts" },
      { name: "Tailwind CSS", details: "Utility-First Design Tokens" },
      { name: "Bootstrap", details: "Responsive Grid & Components" },
      { name: "DaisyUI", details: "Semantic Component Tokens" }
    ]
  },
  {
    categoryNumber: "03",
    categoryName: "MOTION & INTERACTION",
    categoryDesc: "High-performance animations, scroll choreography, and interactive physics.",
    skills: [
      { name: "GSAP", details: "ScrollTrigger · Timelines · Staggers" },
      { name: "Framer Motion", details: "Layout Animations · Gestures" },
      { name: "Canvas / DOM Animation", details: "Interactive Micro-Interactions" }
    ]
  },
  {
    categoryNumber: "04",
    categoryName: "BACKEND & DATA",
    categoryDesc: "Server runtimes, RESTful services, database engines, and in-memory caches.",
    skills: [
      { name: "Node.js", details: "Event Loop · Asynchronous I/O" },
      { name: "Express.js", details: "Routing · API Middleware" },
      { name: "MongoDB", details: "NoSQL Database · Aggregations" },
      { name: "Mongoose", details: "Schema Modeling · Validation" },
      { name: "Redis", details: "In-Memory Caching · Fast I/O" },
      { name: "REST APIs", details: "Endpoint Architecture · Protocols" },
      { name: "Axios", details: "HTTP Client · Interceptor Pipeline" }
    ]
  },
  {
    categoryNumber: "05",
    categoryName: "SECURITY & ARCHITECTURE",
    categoryDesc: "Authentication protocols, validation schemas, and clean architectural design.",
    skills: [
      { name: "JWT Authentication", details: "Token Lifecycle · Payload Verify" },
      { name: "RBAC", details: "Role-Based Access Control" },
      { name: "Zod Validation", details: "Schema Parsing · Runtime Type Safety" },
      { name: "bcrypt", details: "Password Hashing · Salt Rounds" },
      { name: "HttpOnly Cookies", details: "XSS & CSRF Mitigation" },
      { name: "Rate Limiting", details: "Brute-Force & DDoS Protection" },
      { name: "Clean Architecture", details: "Separation of Concerns · Modularity" },
      { name: "API Middleware Architecture", details: "Pipeline Handlers · Error Guards" }
    ]
  },
  {
    categoryNumber: "06",
    categoryName: "BROWSER & PLATFORM",
    categoryDesc: "Browser platform extensions, background worker pipelines, and DOM scripts.",
    skills: [
      { name: "Chrome Extension Development", details: "Extension Lifecycle · Web Store" },
      { name: "Manifest V3", details: "Declarative Net Request · Modern Spec" },
      { name: "Chrome APIs", details: "Tabs · Storage · Runtime · Alarms" },
      { name: "Service Workers", details: "Background Event Sync & Lifecycles" },
      { name: "Content Scripts", details: "DOM Injection · Message Passing" }
    ]
  },
  {
    categoryNumber: "07",
    categoryName: "DEVOPS & DEPLOYMENT",
    categoryDesc: "Version control, containerization, build toolchains, and edge deployment.",
    skills: [
      { name: "Git", details: "Version Control · Branching Strategy" },
      { name: "GitHub", details: "CI/CD Actions · Code Reviews" },
      { name: "Vite", details: "Lightning Fast Bundling & HMR" },
      { name: "npm", details: "Package Ecosystem Management" },
      { name: "Vercel", details: "Edge Network · Serverless Delivery" },
      { name: "Docker", details: "Containerization · Image Builds" },
      { name: "Docker Compose", details: "Multi-Service Orchestration" },
      { name: "Nginx", details: "Reverse Proxy · Web Server" }
    ]
  },
  {
    categoryNumber: "08",
    categoryName: "INTEGRATIONS",
    categoryDesc: "Third-party cloud infrastructure, media delivery CDNs, and payment gateways.",
    skills: [
      { name: "Cloudinary", details: "Media Asset CDN · Transformations" },
      { name: "SSLCOMMERZ", details: "Payment Gateway · Transactions" },
      { name: "MongoDB Atlas", details: "Managed Cloud Clusters & Backups" }
    ]
  }
];

/* ==========================================================================
   DOM REFERENCES
   ========================================================================== */
const projectGridElement = document.getElementById("projectGrid");
const skillsMatrixElement = document.getElementById("skillsMatrix");
const filterButtons = document.querySelectorAll("[data-filter]");
const scrollProgress = document.getElementById("scroll-progress");
const techCursor = document.getElementById("tech-cursor");
const techFollower = document.getElementById("tech-cursor-follower");

// Case study modal elements
const caseStudyModal = document.getElementById("caseStudyModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalProjectNumber = document.getElementById("modalProjectNumber");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalProjectSubtitle = document.getElementById("modalProjectSubtitle");
const modalProjectRole = document.getElementById("modalProjectRole");
const modalProjectYear = document.getElementById("modalProjectYear");
const modalProjectStatus = document.getElementById("modalProjectStatus");
const modalProjectStack = document.getElementById("modalProjectStack");
const modalProjectOverview = document.getElementById("modalProjectOverview");
const modalProjectProblem = document.getElementById("modalProjectProblem");
const modalProjectSolution = document.getElementById("modalProjectSolution");
const modalProjectFeatures = document.getElementById("modalProjectFeatures");
const modalProjectArch = document.getElementById("modalProjectArch");
const modalLiveBtn = document.getElementById("modalLiveBtn");
const modalRepoBtn = document.getElementById("modalRepoBtn");

// Mobile menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuClose = document.getElementById("mobileMenuClose");

// Toast
const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

/* ==========================================================================
   DYNAMIC TELEMETRY & FILTER COUNTS
   ========================================================================== */
function updateFilterCounts() {
  const total = String(projects.length).padStart(2, "0");
  const apps = String(projects.filter(p => p.type === "app").length).padStart(2, "0");
  const ui = String(projects.filter(p => p.type === "ui").length).padStart(2, "0");
  const multi = String(projects.filter(p => p.type === "multi").length).padStart(2, "0");

  const btnAll = document.querySelector('[data-filter="all"]');
  const btnApp = document.querySelector('[data-filter="app"]');
  const btnUi = document.querySelector('[data-filter="ui"]');
  const btnMulti = document.querySelector('[data-filter="multi"]');

  if (btnAll) btnAll.textContent = `ALL // ${total}`;
  if (btnApp) btnApp.textContent = `APPS // ${apps}`;
  if (btnUi) btnUi.textContent = `UI/UX // ${ui}`;
  if (btnMulti) btnMulti.textContent = `MULTI-PAGE // ${multi}`;

  const heroCountEl = document.getElementById("heroProjectCount");
  if (heroCountEl) {
    heroCountEl.textContent = `${total}+`;
  }
}

/* ==========================================================================
   RENDER SELECTED WORKS (PROJECTS)
   ========================================================================== */
function renderProjects(filter = "all") {
  const filtered = filter === "all"
    ? projects
    : projects.filter(p => p.type === filter);

  projectGridElement.innerHTML = filtered.map((project, idx) => {
    const projectNum = project.number || String(idx + 1).padStart(3, "0");
    return `
    <article class="project-poster-card flex flex-col justify-between" data-project-id="${project.id}">
      <div>
        <!-- Top Bar with Number & Category -->
        <div class="p-4 border-b border-[#D8D8D5] flex items-center justify-between bg-[#E6E6DF]">
          <div class="flex items-center gap-2">
            <span class="font-mono-tech text-xs font-bold text-[#8F1D25]">PROJECT / ${projectNum}</span>
            <span class="text-[#747474] text-xs">/</span>
            <span class="font-mono-tech text-xs text-[#747474] uppercase">${project.status}</span>
          </div>
          <span class="dossier-tag-neutral">${project.category}</span>
        </div>

        <!-- Thumbnail Frame with Corner Marks -->
        <div class="project-thumb-frame relative">
          <div class="corner-bracket corner-tl"></div>
          <div class="corner-bracket corner-tr"></div>
          <div class="corner-bracket corner-bl"></div>
          <div class="corner-bracket corner-br"></div>
          <img 
            src="${project.image}" 
            alt="${project.title}" 
            class="project-thumb"
            loading="lazy"
            onerror="this.src='https://placehold.co/800x450/DFDFD8/111111?text=${encodeURIComponent(project.title)}'"
          />
        </div>

        <!-- Content Body -->
        <div class="p-6">
          <div class="flex items-baseline justify-between gap-2 mb-2">
            <h3 class="font-serif-display text-2xl font-bold text-[#111111]">${project.title}</h3>
            <span class="font-mono-tech text-xs text-[#747474]">${project.year}</span>
          </div>
          <p class="font-mono-tech text-xs text-[#8F1D25] font-semibold mb-3">${project.subtitle}</p>
          <p class="font-sans-ui text-sm text-[#4A4A46] leading-relaxed mb-4">${project.description}</p>

          <!-- Highlight Box -->
          <div class="p-3 bg-[#E0E0D8] border-l-2 border-[#8F1D25] mb-4">
            <p class="font-mono-tech text-xs text-[#111111] leading-tight">
              <span class="text-[#8F1D25] font-bold">KEY SPEC //</span> ${project.highlight}
            </p>
          </div>

          <!-- Stack Badges -->
          <div class="flex flex-wrap gap-1.5 mb-2">
            ${project.stack.map(st => `<span class="dossier-tag-neutral">${st}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-4 border-t border-[#D8D8D5] bg-[#EFEFE9] flex flex-wrap items-center justify-between gap-3">
        <button 
          onclick="openCaseStudy('${project.id}')"
          class="btn-editorial-primary btn-editorial-sm w-full sm:w-auto"
        >
          INSPECT CASE STUDY →
        </button>

        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <a 
            href="${project.live}" 
            target="_blank" 
            rel="noreferrer"
            class="btn-editorial-outline btn-editorial-sm ${project.live === '#' ? 'opacity-40 pointer-events-none' : ''}"
          >
            LIVE ↗
          </a>
          <a 
            href="${project.repo}" 
            target="_blank" 
            rel="noreferrer"
            class="btn-editorial-outline btn-editorial-sm"
          >
            REPO ↗
          </a>
        </div>
      </div>
    </article>
  `;
  }).join('');

  // Animate newly injected cards
  gsap.fromTo(".project-poster-card",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
  );
}

/* ==========================================================================
   RENDER TECHNICAL TOOLBOX (SKILLS)
   ========================================================================== */
function renderSkills() {
  skillsMatrixElement.innerHTML = skillMatrix.map((cat) => `
    <div class="skill-category-box flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#D8D8D5]">
          <span class="font-mono-tech text-xs font-bold text-[#8F1D25]">${cat.categoryNumber} //</span>
          <span class="font-mono-tech text-xs font-bold uppercase tracking-wider text-[#111111]">${cat.categoryName}</span>
        </div>
        <p class="font-sans-ui text-xs text-[#747474] mb-4 leading-relaxed">${cat.categoryDesc}</p>
        
        <div class="flex flex-col gap-2">
          ${cat.skills.map(s => `
            <div class="skill-pill flex-col !items-start !gap-0.5 w-full">
              <div class="flex items-center justify-between w-full">
                <span class="font-bold text-[#111111] text-xs">${s.name}</span>
                <span class="w-1.5 h-1.5 bg-[#8F1D25] rounded-full opacity-60"></span>
              </div>
              ${s.details ? `<span class="text-[0.6875rem] text-[#666662] font-mono-tech leading-tight">${s.details}</span>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="mt-5 pt-3 border-t border-[#D8D8D5] flex items-center justify-between font-mono-tech text-[0.65rem] text-[#747474]">
        <span>TOTAL: ${String(cat.skills.length).padStart(2, "0")} NODES</span>
        <span class="text-[#8F1D25] font-bold">VERIFIED [●]</span>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   CASE STUDY MODAL ENGINE
   ========================================================================== */
function openCaseStudy(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  modalProjectNumber.textContent = `PROJECT / ${project.number}`;
  modalProjectTitle.textContent = project.title;
  modalProjectSubtitle.textContent = `${project.subtitle} · [${project.category}]`;
  modalProjectRole.textContent = project.role;
  modalProjectYear.textContent = project.year;
  modalProjectStatus.textContent = project.status;
  modalProjectOverview.textContent = project.caseStudy.overview;
  modalProjectProblem.textContent = project.caseStudy.problem;
  modalProjectSolution.textContent = project.caseStudy.solution;
  modalProjectArch.textContent = project.caseStudy.architectureNotes;

  // Stack
  modalProjectStack.innerHTML = project.stack.map(s => `
    <span class="dossier-tag-neutral font-bold">${s}</span>
  `).join('');

  // Features
  modalProjectFeatures.innerHTML = project.caseStudy.keyFeatures.map(f => `
    <li class="flex items-start gap-2 text-sm text-[#4A4A46]">
      <span class="text-[#8F1D25] font-mono font-bold">›</span>
      <span>${f}</span>
    </li>
  `).join('');

  // Buttons
  if (project.live === '#') {
    modalLiveBtn.classList.add('opacity-40', 'pointer-events-none');
    modalLiveBtn.setAttribute('href', '#');
  } else {
    modalLiveBtn.classList.remove('opacity-40', 'pointer-events-none');
    modalLiveBtn.setAttribute('href', project.live);
  }
  modalRepoBtn.setAttribute('href', project.repo);

  // Show modal
  caseStudyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
  caseStudyModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeCaseStudy);
}

if (caseStudyModal) {
  caseStudyModal.addEventListener('click', (e) => {
    if (e.target === caseStudyModal) closeCaseStudy();
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && caseStudyModal.classList.contains('active')) {
    closeCaseStudy();
  }
});

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(msg = "COPIED TO CLIPBOARD") {
  if (!toastNotification || !toastMessage) return;
  toastMessage.textContent = msg;
  toastNotification.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toastNotification.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toastNotification.classList.remove('opacity-100', 'translate-y-0');
    toastNotification.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
  }, 3000);
}

function copyEmail() {
  const email = "samiumbashirbosunia@gmail.com";
  navigator.clipboard.writeText(email).then(() => {
    showToast("EMAIL COPIED: samiumbashirbosunia@gmail.com");
  }).catch(() => {
    showToast("EMAIL: samiumbashirbosunia@gmail.com");
  });
}

/* ==========================================================================
   FILTER BUTTONS CONTROLLER
   ========================================================================== */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

/* ==========================================================================
   MOBILE MENU CONTROLLER
   ========================================================================== */
if (mobileMenuBtn && mobileMenuOverlay && mobileMenuClose) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  const closeMobile = () => {
    mobileMenuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  mobileMenuClose.addEventListener('click', closeMobile);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobile);
  });
}

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = `${scrollPercent}%`;
  }
});

/* ==========================================================================
   CUSTOM TECHNICAL CURSOR
   ========================================================================== */
if (window.innerWidth > 768 && techCursor && techFollower) {
  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    techCursor.style.left = `${mouseX}px`;
    techCursor.style.top = `${mouseY}px`;

    gsap.to(techFollower, {
      x: mouseX,
      y: mouseY,
      duration: 0.18,
      ease: "power2.out"
    });
  });

  // Scale cursor follower on clickable elements
  document.querySelectorAll("a, button, .project-poster-card, .skill-pill, .blueprint-node").forEach(el => {
    el.addEventListener("mouseenter", () => {
      gsap.to(techFollower, { width: 44, height: 44, duration: 0.2 });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(techFollower, { width: 28, height: 28, duration: 0.2 });
    });
  });
}

/* ==========================================================================
   ACTIVE NAVIGATION TRACKER
   ========================================================================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".editorial-nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ==========================================================================
   GSAP EDITORIAL SCROLL ANIMATIONS
   ========================================================================== */
function initGSAPEditorial() {
  // Hero Elements Entrance Timeline
  const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTimeline
    .from("#hero-dossier-tag", { opacity: 0, y: -20, duration: 0.6 })
    .from("#hero-name-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.3")
    .from("#hero-sub-title", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
    .from("#hero-meta-table", { opacity: 0, y: 25, duration: 0.7 }, "-=0.3")
    .from("#hero-statement", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
    .from("#hero-ctas", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
    .from("#hero-portrait-frame", { opacity: 0, scale: 0.95, x: 40, duration: 1 }, "-=0.8")
    .from("#hero-telemetry", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");

  // Section Headers Reveal
  document.querySelectorAll(".section-marker").forEach(marker => {
    ScrollTrigger.create({
      trigger: marker,
      start: "top 85%",
      onEnter: () => {
        gsap.fromTo(marker,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    });
  });

  // Blueprint Nodes Reveal
  ScrollTrigger.create({
    trigger: "#architecture",
    start: "top 75%",
    onEnter: () => {
      gsap.fromTo(".blueprint-node",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  });

  // Pipeline Steps Reveal
  ScrollTrigger.create({
    trigger: "#pipeline",
    start: "top 75%",
    onEnter: () => {
      gsap.fromTo(".pipeline-step-box",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
    }
  });
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  updateFilterCounts();
  renderProjects();
  renderSkills();
  initGSAPEditorial();
});

