const projects = [
  {
    title: "Convention Center",
    category: "Vanue Showcase",
    type: "ui",
    image: "./Image/convension_center.png",
    description:
      "A professional landing page for a convention center featuring event spaces, pricing plans, and a contact section.",
    stack: ["HTML", "Bootstrap 5", "CSS"],
    live: "https://abacus-convention-center.netlify.app/",
    repo: "https://github.com/SamiumBashir/Abacus-Convention-Center",
    highlight:
      "Built with a focus on responsive layout and professional UI using Bootstrap 5.",
  },
  {
    title: "Job Tracker",
    category: "Productivity App",
    type: "app",
    image: "./Image/jat.png",
    description:
      "A job-tracking interface with app-like structure, Tailwind-based styling, and JavaScript behavior.",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    live: "https://job-tracker-xi-ashen.vercel.app/",
    repo: "https://github.com/SamiumBashir/Job-Tracker-",
    highlight:
      "A productivity-focused dashboard designed to streamline and manage the end-to-end job application lifecycle.",
  },
  {
    title: "Leno",
    category: "App Landing Page",
    type: "multi",
    image: "./Image/leno.png",
    description:
      "A health and productivity app website with multiple pages and vanilla JavaScript alongside HTML and CSS.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://leno-web-rouge.vercel.app/",
    repo: "https://github.com/SamiumBashir/Leno-",
    highlight:
      "A sleek, conversion-optimized landing page featuring responsive design and interactive mobile app showcases.",
  },
  {
    title: "Lumina Creative",
    category: "Creative Agency",
    type: "multi",
    image: "./Image/lumina.png",
    description:
      "A multi-page creative site with separate pages and a more complete small-business website structure.",
    stack: ["HTML", "CSS", "JavaScript", "Multi-page Build"],
    live: "https://lumina-creative-beta.vercel.app/",
    repo: "https://github.com/SamiumBashir/Lumina-Creative",
    highlight:
      "A professional agency portfolio built with a modern aesthetic to highlight creative services and client work.",
  },
  {
    title: "Tutor Website",
    category: "Education Platform",
    type: "multi",
    image: "./Image/tutor.png",
    description:
      "An education landing page with course messaging, strong content organization, and multiple sections.",
    stack: ["HTML", "CSS", "JavaScript"],
    live: "https://tw-tutor.netlify.app/",
    repo: "https://github.com/SamiumBashir/Tutor-Website",
    highlight:
      "An educational marketplace UI focused on intuitive navigation and streamlined tutor-student connectivity.",
  },
  {
    title: "DigiTools",
    category: "Digital Tools",
    type: "app",
    image: "./Image/digitool.png",
    description:
      "DigiTools is a modern web application designed to showcase and manage digital products and tools.",
    stack: ["React", "Vite", " DaisyUI", "React Toastify"],
    live: "https://digi-tools-inky.vercel.app/",
    repo: "https://github.com/SamiumBashir/DigiTools",
    highlight:
      "A versatile utility hub leveraging complex JavaScript logic to provide real-time digital tools and calculators.",
  },
];

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "React 19",
  "Tailwind CSS",
  "Bootstrap 5",
  "Responsive Design",
  "Git & GitHub",
  "Vercel",
  "Netlify",
];

const projectGrid = document.getElementById("projectGrid");
const skillsList = document.getElementById("skillsList");
const filterButtons = document.querySelectorAll("[data-filter]");
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const root = document.documentElement;

function renderProjects(filter = "all") {
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((project) => project.type === filter);

  projectGrid.innerHTML = filtered
    .map((project) => {
      return `
        <article class="card border border-base-300 bg-base-200 shadow-xl transition-transform hover:-translate-y-1">
          <div class="card-body">
            <div class="flex items-center justify-between gap-3">
              <h3 class="card-title text-2xl">${project.title}</h3>
              <div class="badge badge-outline text-xs sm:text-sm">${project.category}</div>
            </div>
            <img src= "${project.image}"
            alt ="${project.title}"/>
            <p class="text-base-content/75">${project.description}</p>

            <div class="alert border border-primary/20 bg-primary/10 py-3 text-sm">
              <span>${project.highlight}</span>
            </div>

            <div class="flex flex-wrap gap-2 pt-2">
              ${(project.stack || [])
                .map(
                  (item) =>
                    `<span class="badge badge-neutral badge-outline">${item}</span>`,
                )
                .join("")}
            </div>

            <div class="card-actions mt-4 justify-end">
              <a href="${project.live}" target="_blank" rel="noreferrer"
                class="btn btn-primary btn-sm ${
                  project.live === "#" ? "btn-disabled" : ""
                }">
                Live Demo
              </a>

              <a href="${project.repo}" target="_blank" rel="noreferrer"
                class="btn btn-outline btn-sm">
                Repository
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSkills() {
  const skillsWithIcons = [
    { name: "HTML5", icon: "html5-plain" },
    { name: "CSS3", icon: "css3-plain" },
    { name: "JavaScript", icon: "javascript-plain" },
    { name: "React 19", icon: "react-original" },
    { name: "Tailwind", icon: "tailwindcss-original" },
    { name: "Bootstrap 5", icon: "bootstrap-plain" },
    { name: "Git", icon: "git-plain" },
    { name: "GitHub", icon: "github-original" },
    { name: "Vercel", icon: "vercel-original" },
    { name: "Netlify", icon: "netlify-plain" }
  ];

  const skillsList = document.getElementById("skillsList");

  skillsList.innerHTML = skillsWithIcons
    .map(
      (skill, index) => `
        <div class="skill-card group relative bg-base-200/40 backdrop-blur-md border border-base-300 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--p),0.2)]" 
             data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10"></div>

            <div class="skill-icon-container relative w-20 h-20 bg-base-100 rounded-2xl shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                <i class="devicon-${skill.icon} colored text-5xl filter grayscale group-hover:grayscale-0 transition-all duration-500"></i>
            </div>
            
            <div class="text-center">
                <span class="font-black text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">${skill.name}</span>
                <div class="w-12 h-1 bg-base-300 mx-auto mt-2 rounded-full overflow-hidden">
                    <div class="bg-primary h-full w-0 group-hover:w-full transition-all duration-700"></div>
                </div>
            </div>
        </div>
    `,
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("btn-active"));
    button.classList.add("btn-active");
    renderProjects(button.dataset.filter);
  });
});

function toggleTheme(e) {
  const isChecked = e.target.checked;
  const newTheme = isChecked ? "night" : "nord";
  root.setAttribute("data-theme", newTheme);

  if (themeToggle) themeToggle.checked = isChecked;
  if (themeToggleMobile) themeToggleMobile.checked = isChecked;

  localStorage.setItem("theme", newTheme);
}

if (themeToggle) themeToggle.addEventListener("change", toggleTheme);
if (themeToggleMobile)
  themeToggleMobile.addEventListener("change", toggleTheme);

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "night";
  root.setAttribute("data-theme", savedTheme);

  if (themeToggle) themeToggle.checked = savedTheme === "night";
  if (themeToggleMobile) themeToggleMobile.checked = savedTheme === "night";

  renderProjects();
  renderSkills();

  filterButtons[0]?.classList.add("btn-active");
});
