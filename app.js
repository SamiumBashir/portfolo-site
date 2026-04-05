const projects = [
      {
        title: 'Furniro',
        category: 'E-commerce UI',
        type: 'ui',
        description: 'A polished furniture storefront with category browsing, product cards, promotional sections, and strong visual hierarchy.',
        stack: ['HTML', 'CSS'],
        live: 'https://furniro-pearl.vercel.app/',
        repo: 'https://github.com/SamiumBashir/Furniro',
        highlight: 'Best pure UI showcase in the portfolio.'
      },
      {
        title: 'Job Tracker',
        category: 'Productivity App',
        type: 'app',
        description: 'A job-tracking interface with app-like structure, Tailwind-based styling, and JavaScript behavior.',
        stack: ['HTML', 'Tailwind CSS', 'JavaScript'],
        live: 'https://job-tracker-xi-ashen.vercel.app/',
        repo: 'https://github.com/SamiumBashir/Job-Tracker-',
        highlight: 'Strongest project for showing app-oriented front-end skills.'
      },
      {
        title: 'Leno',
        category: 'App Landing Page',
        type: 'multi',
        description: 'A health and productivity app website with multiple pages and vanilla JavaScript alongside HTML and CSS.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        live: 'https://leno-web-rouge.vercel.app/',
        repo: 'https://github.com/SamiumBashir/Leno-',
        highlight: 'A good balance of polish, structure, and JavaScript signal.'
      },
      {
        title: 'Lumina Creative',
        category: 'Creative Agency',
        type: 'multi',
        description: 'A multi-page creative site with separate pages and a more complete small-business website structure.',
        stack: ['HTML', 'CSS', 'Multi-page Build'],
        live: 'https://lumina-creative-beta.vercel.app/',
        repo: 'https://github.com/SamiumBashir/Lumina-Creative',
        highlight: 'Adds brand-style variety to the portfolio.'
      },
      {
        title: 'Tutor Website',
        category: 'Education Platform',
        type: 'multi',
        description: 'An education landing page with course messaging, strong content organization, and multiple sections.',
        stack: ['HTML', 'CSS', 'JavaScript'],
        live: 'https://tw-tutor.netlify.app/',
        repo: 'https://github.com/SamiumBashir/Tutor-Website',
        highlight: 'Best content-heavy layout among the learning projects.'
      }
    ];

    const skills = [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Tailwind CSS',
      'DaisyUI',
      'Bootstrap 5',
      'Responsive Design',
      'Git & GitHub',
      'Vercel',
      'Netlify'
    ];

    const projectGrid = document.getElementById('projectGrid');
    const skillsList = document.getElementById('skillsList');
    const filterButtons = document.querySelectorAll('[data-filter]');
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    function renderProjects(filter = 'all') {
      const filtered = filter === 'all'
        ? projects
        : projects.filter(project => project.type === filter);

      projectGrid.innerHTML = filtered.map(project => `
        <article class="card border border-base-300 bg-base-200 shadow-xl transition-transform hover:-translate-y-1">
          <div class="card-body">
            <div class="flex items-center justify-between gap-3">
              <h3 class="card-title text-2xl">${project.title}</h3>
              <div class="badge badge-outline">${project.category}</div>
            </div>
            <p class="text-base-content/75">${project.description}</p>
            <div class="alert border border-primary/20 bg-primary/10 py-3 text-sm">
              <span>${project.highlight}</span>
            </div>
            <div class="flex flex-wrap gap-2 pt-2">
              ${project.stack.map(item => `<span class="badge badge-neutral badge-outline">${item}</span>`).join('')}
            </div>
            <div class="card-actions mt-4 justify-end">
              <a href="${project.live}" target="_blank" rel="noreferrer" class="btn btn-primary btn-sm ${project.live === '#' ? 'btn-disabled' : ''}">Live Demo</a>
              <a href="${project.repo}" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm">Repository</a>
            </div>
          </div>
        </article>
      `).join('');
    }

    function renderSkills() {
      skillsList.innerHTML = skills
        .map(skill => `<span class="badge badge-lg badge-outline py-4">${skill}</span>`)
        .join('');
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('btn-active'));
        button.classList.add('btn-active');
        renderProjects(button.dataset.filter);
      });
    });

    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      root.setAttribute('data-theme', current === 'night' ? 'cupcake' : 'night');
    });

    renderProjects();
    renderSkills();